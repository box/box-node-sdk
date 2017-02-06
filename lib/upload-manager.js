/**
 * @fileoverview Upload manager for large file uploads
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const EventEmitter = require('events').EventEmitter,
	ReadableStream = require('stream').Readable,
	crypto = require('crypto');

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

//@TODO: make into an option
const RETRY_INTERVAL_MS = 1000;

const DEFAULT_OPTIONS = {
	parallelism: 4
};

class Chunk extends EventEmitter {

	/**
	 * Create a Chunk, representing a part of a file being uploaded
	 * @param {BoxClient} client The Box SDK client
	 * @param {string} sessionID The ID of the upload session the chunk belongs to
	 * @param {?Buffer|string} chunk The chunk that was uploaded
	 * @param {int} offset The bute offset within the file where this chunk begins
	 * @param {int} totalSize The total size of the file this chunk belongs to
	 */
	constructor(client, sessionID, chunk, offset, totalSize) {

		super();

		this.client = client;
		this.sessionID = sessionID;
		this.chunk = chunk;
		this.length = chunk.length;
		this.offset = offset;
		this.totalSize = totalSize;
		this.data = null;
		this.retry = null;
		this.canceled = false;
	}

	/**
	 * Get the final object representation of this chunk for the API
	 * @returns {UploadPart} The chunk object
	 */
	getData() {

		return this.data;
	}

	/**
	 * Upload a chunk to the API
	 * @returns {void}
	 */
	upload() {

		this.client.files.uploadPart(this.sessionID, this.chunk, this.offset, this.totalSize, null, (err, data) => {

			if (this.canceled) {
				this.chunk = null;
				return;
			}

			if (err) {
				// handle the error or retry
				if (err.statusCode) {
					// an API error, probably not retryable!
					this.emit('error', err);
				} else {
					// maybe a network error, retry
					this.retry = setTimeout(() => this.upload(), RETRY_INTERVAL_MS);
				}
				return;
			}

			// Record the chunk data for commit, and try to free up the chunk buffer
			this.data = data;
			this.chunk = null;
			this.emit('uploaded', data);
		});
	}

	/**
	 * Cancel trying to upload a chunk, preventing it from retrying and clearing
	 * the associated buffer
	 * @returns {void}
	 */
	cancel() {

		clearTimeout(this.retry);
		this.chunk = null;
		this.canceled = true;
	}
}

// -----------------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------------

//@TODO: rename to something better
/** Manager for uploading a file in chunks */
class UploadManager extends EventEmitter {

	/**
	 * Create an upload manager
	 * @param {BoxClient} client The client to use to upload the file
	 * @param {Object} uploadSessionInfo The upload session info to use for chunked upload
	 * @param {ReadableStream|Buffer|string} file The file to upload
	 * @param {int} size The size of the file to be uploaded
	 * @param {Object} [options] Optional parameters
	 */
	constructor(client, uploadSessionInfo, file, size, options) {

		super();

		this.client = client;
		this.sessionID = uploadSessionInfo.upload_session_id;
		this.partSize = uploadSessionInfo.part_size;
		this.uploadSessionInfo = uploadSessionInfo;

		if (file instanceof ReadableStream) {
			// Pause the stream so we can read specific chunks from it
			this.stream = file.pause();
			this.streamBuffer = [];
		} else if (file instanceof Buffer || typeof file === 'string') {
			this.file = file;
		} else {
			throw new TypeError('file must be a Stream, Buffer, or string!');
		}

		this.size = size;
		this.options = Object.assign({}, DEFAULT_OPTIONS, options);

		this.isStarted = false;
		this.numChunksInFlight = 0;
		this.chunks = [];
		this.position = 0;
		this.fileHash = crypto.createHash('sha1');
	}

	/**
	 * Start an upload
	 * @returns {void}
	 */
	start() {

		if (this.isStarted) {
			return;
		}

		// Create the initial chunks
		for (let i = 0; i < this.options.parallelism; i++) {
			this._getNextChunk(chunk => (chunk ? this._uploadChunk(chunk) : this._commit()));
		}
		this.isStarted = true;
	}

	/**
	 * Abort a running upload, which cancels all currently uploading chunks,
	 * attempts to free up held memory, and aborts the upload session.  This
	 * cannot be undone or resumed.
	 * @returns {void}
	 */
	abort() {

		this.chunks.forEach(chunk => chunk.removeAllListeners().cancel());
		this.chunks = [];
		this.file = null;
		this.stream = null;

		this.client.files.abortUploadSession(this.sessionID, err => {

			if (err) {
				this.emit('abortFailed', err);
				return;
			}

			this.emit('aborted');
		});
	}

	/**
	 * Get the next chunk of the file to be uploaded
	 * @param {Function} callback Called with the next chunk of the file to be uploaded
	 * @returns {void}
	 * @private
	 */
	_getNextChunk(callback) {

		if (this.position >= this.size) {
			callback(null);
			return;
		}

		let buf;

		if (this.file) {

			// Buffer/string case, just get the slice we need
			buf = this.file.slice(this.position, this.position + this.partSize);
		} else if (this.streamBuffer.length) {

			buf = this.streamBuffer.shift();
		} else {

			// Stream case, need to read
			buf = this.stream.read(this.partSize);

			if (!buf) {
				// stream needs to read more, retry later
				setImmediate(() => this._getNextChunk(callback));
				return;
			} else if (buf.length > this.partSize) {

				// stream is done reading and had extra data, buffer the remainder of the file
				for (let i = 0; i < buf.length; i += this.partSize) {

					this.streamBuffer.push(buf.slice(i, i + this.partSize));
				}
				buf = this.streamBuffer.shift();
			}
		}

		this.fileHash.update(buf);
		let chunk = new Chunk(this.client, this.sessionID, buf, this.position, this.size);
		this.position += buf.length;
		callback(chunk);
	}

	/**
	 * Upload a chunk
	 * @param {Chunk} chunk The chunk to upload
	 * @returns {void}
	 */
	_uploadChunk(chunk) {

		this.numChunksInFlight += 1;

		//@TODO: consider 'chunkError' instead of 'error'
		chunk.on('error', err => this.emit('error', err));
		chunk.on('uploaded', data => {

			this.numChunksInFlight -= 1;

			this.emit('chunkUploaded', data);
			this._getNextChunk(nextChunk => (nextChunk ? this._uploadChunk(nextChunk) : this._commit()));
		});
		chunk.upload();
		this.chunks.push(chunk);
	}

	/**
	 * Commit the upload, finalizing it
	 * @returns {void}
	 */
	_commit() {

		if (!this.isStarted || this.numChunksInFlight > 0) {
			return;
		}

		let hash = this.fileHash.digest('base64');
		this.isStarted = false;
		this.client.files.commitUploadSession(this.sessionID, hash, this.chunks.map(c => c.getData()), null, (err, file) => {

			//@TODO: retry on error or return more useful error here
			if (err) {
				this.emit('error', err);
				return;
			}

			this.emit('uploadComplete', file);
		});
	}

}

module.exports = UploadManager;
