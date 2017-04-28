/**
 * @fileoverview Upload manager for large file uploads
 */

'use strict';

// -----------------------------------------------------------------------------
// Typedefs
// -----------------------------------------------------------------------------

/**
 * Chunk uploaded event
 * @event Chunk#uploaded
 * @param {UploadPart} data The data of the uploaded chunk
 * @private
 */

/**
 * Chunk error event
 * @event Chunk#error
 * @param {Error} err The error that occurred
 * @private
 */

/**
 * Event for when the upload is successfully aborted
 * @event ChunkedUploader#aborted
 */

/**
 * Event for when the abort fails because the upload session is not destroyed.
 * In general, the abort can be retried, and no new chunks will be uploaded.
 * @event ChunkedUploader#abortFailed
 * @param {Error} err The error that occurred
 */

/**
 * Event for when a chunk fails to upload.  Note that the chunk will automatically
 * retry until it is successfully uploaded.
 * @event ChunkedUploader#chunkError
 * @param {Error} err The error that occurred during chunk upload
 */

/**
 * Event for when a chunk is successfully uploaded
 * @event ChunkedUploader#chunkUploaded
 * @param {UploadPart} data The data for the uploaded chunk
 */

/**
 * Event for when the entire upload is complete
 * @event ChunkedUploader#uploadComplete
 * @param {Object} file The file object for the newly-uploaded file
 */

/**
 * Event for when an upload fails
 * @event ChunkedUploader#error
 * @param {Error} err The error that occurred
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const EventEmitter = require('events').EventEmitter,
	ReadableStream = require('stream').Readable,
	crypto = require('crypto');

// -----------------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------------

const DEFAULT_OPTIONS = Object.freeze({
	parallelism: 4,
	retryInterval: 1000
});

/**
 * Chunk of a file to be uploaded, which handles trying to upload itself until
 * it succeeds.
 * @private
 */
class Chunk extends EventEmitter {

	/**
	 * Create a Chunk, representing a part of a file being uploaded
	 * @param {BoxClient} client The Box SDK client
	 * @param {string} sessionID The ID of the upload session the chunk belongs to
	 * @param {Buffer|string} chunk The chunk that was uploaded
	 * @param {int} offset The byte offset within the file where this chunk begins
	 * @param {int} totalSize The total size of the file this chunk belongs to
	 * @param {Object} options The options from the ChunkedUploader
	 * @param {int} options.retryInterval The number of ms to wait before retrying a chunk upload
	 */
	constructor(client, sessionID, chunk, offset, totalSize, options) {

		super();

		this.client = client;
		this.sessionID = sessionID;
		this.chunk = chunk;
		this.length = chunk.length;
		this.offset = offset;
		this.totalSize = totalSize;
		this.options = options;
		this.data = null;
		this.retry = null;
		this.canceled = false;
	}

	/**
	 * Get the final object representation of this chunk for the API
	 * @returns {UploadPart} The chunk object
	 */
	getData() {

		return this.data.part;
	}

	/**
	 * Upload a chunk to the API
	 * @returns {void}
	 * @emits Chunk#uploaded
	 * @emits Chunk#error
	 */
	upload() {

		this.client.files.uploadPart(this.sessionID, this.chunk, this.offset, this.totalSize, (err, data) => {

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
					this.retry = setTimeout(() => this.upload(), this.options.retryInterval);
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

/** Manager for uploading a file in chunks */
class ChunkedUploader extends EventEmitter {

	/**
	 * Create an upload manager
	 * @param {BoxClient} client The client to use to upload the file
	 * @param {Object} uploadSessionInfo The upload session info to use for chunked upload
	 * @param {ReadableStream|Buffer|string} file The file to upload
	 * @param {int} size The size of the file to be uploaded
	 * @param {Object} [options] Optional parameters
	 * @param {int} [options.retryInterval=1000] The number of ms to wait before retrying operations
	 * @param {int} [options.parallelism=4] The number of concurrent chunks to upload
	 */
	constructor(client, uploadSessionInfo, file, size, options) {

		super();

		this._client = client;
		this._sessionID = uploadSessionInfo.id;
		this._partSize = uploadSessionInfo.part_size;
		this._uploadSessionInfo = uploadSessionInfo;

		if (file instanceof ReadableStream) {
			// Pause the stream so we can read specific chunks from it
			this._stream = file.pause();
			this._streamBuffer = [];
		} else if (file instanceof Buffer || typeof file === 'string') {
			this._file = file;
		} else {
			throw new TypeError('file must be a Stream, Buffer, or string!');
		}

		this._size = size;
		this._options = Object.assign({}, DEFAULT_OPTIONS, options);

		this._isStarted = false;
		this._numChunksInFlight = 0;
		this._chunks = [];
		this._position = 0;
		this._fileHash = crypto.createHash('sha1');
	}

	/**
	 * Start an upload
	 * @returns {void}
	 */
	start() {

		if (this._isStarted) {
			return;
		}

		// Create the initial chunks
		for (let i = 0; i < this._options.parallelism; i++) {
			this._getNextChunk(chunk => (chunk ? this._uploadChunk(chunk) : this._commit()));
		}
		this._isStarted = true;
	}

	/**
	 * Abort a running upload, which cancels all currently uploading chunks,
	 * attempts to free up held memory, and aborts the upload session.  This
	 * cannot be undone or resumed.
	 * @returns {void}
	 * @emits ChunkedUploader#aborted
	 * @emits ChunkedUploader#abortFailed
	 */
	abort() {

		this._chunks.forEach(chunk => chunk.removeAllListeners().cancel());
		this._chunks = [];
		this._file = null;
		this._stream = null;

		this._client.files.abortUploadSession(this._sessionID, err => {

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

		if (this._position >= this._size) {
			callback(null);
			return;
		}

		let buf;

		if (this._file) {

			// Buffer/string case, just get the slice we need
			buf = this._file.slice(this._position, this._position + this._partSize);
		} else if (this._streamBuffer.length) {

			buf = this._streamBuffer.shift();
		} else {

			// Stream case, need to read
			buf = this._stream.read(this._partSize);

			if (!buf) {
				// stream needs to read more, retry later
				setImmediate(() => this._getNextChunk(callback));
				return;
			} else if (buf.length > this._partSize) {

				// stream is done reading and had extra data, buffer the remainder of the file
				for (let i = 0; i < buf.length; i += this._partSize) {

					this._streamBuffer.push(buf.slice(i, i + this._partSize));
				}
				buf = this._streamBuffer.shift();
			}
		}

		this._fileHash.update(buf);
		let chunk = new Chunk(this._client, this._sessionID, buf, this._position, this._size, this._options);
		this._position += buf.length;
		callback(chunk);
	}

	/**
	 * Upload a chunk
	 * @param {Chunk} chunk The chunk to upload
	 * @returns {void}
	 * @emits ChunkedUploader#chunkError
	 * @emits ChunkedUploader#chunkUploaded
	 */
	_uploadChunk(chunk) {

		this._numChunksInFlight += 1;

		chunk.on('error', err => this.emit('chunkError', err));
		chunk.on('uploaded', data => {

			this._numChunksInFlight -= 1;

			this.emit('chunkUploaded', data);
			this._getNextChunk(nextChunk => (nextChunk ? this._uploadChunk(nextChunk) : this._commit()));
		});
		chunk.upload();
		this._chunks.push(chunk);
	}

	/**
	 * Commit the upload, finalizing it
	 * @returns {void}
	 * @emits ChunkedUploader#uploadComplete
	 * @emits ChunkedUploader#error
	 */
	_commit() {

		if (!this._isStarted || this._numChunksInFlight > 0) {
			return;
		}

		let hash = this._fileHash.digest('base64');
		this._isStarted = false;
		let options = {
			parts: this._chunks.map(c => c.getData())
		};
		this._client.files.commitUploadSession(this._sessionID, hash, options, (err, file) => {

			// It's not clear what the SDK can do here, so we just return the error and session info
			// so users can retry if they wish
			if (err) {
				this.emit('error', {
					uploadSession: this._uploadSessionInfo,
					error: err
				});
				return;
			}

			this.emit('uploadComplete', file);
		});
	}

}

module.exports = ChunkedUploader;
