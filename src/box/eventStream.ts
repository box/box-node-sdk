import { BoxSdkError } from './errors';
import {
  EventsManager,
  GetEventsHeadersInput,
  GetEventsQueryParams,
} from '../managers/events.generated';
import { RealtimeServer } from '../schemas/realtimeServer.generated';
import { ByteStream } from '../internal/utilsNode';

enum RealtimeServerEventValue {
  NEW_CHANGE = 'new_change',
  RECONNECT = 'reconnect',
}

/**
 * EventStream is a readable stream that fetches events from the Box API.
 * It uses long polling to receive real-time updates.
 * This class is designed to be used with Node.js streams.
 *
 * @param {EventsManager} options.eventsManager - The EventsManager instance which provides relevant methods to fetch events.
 * @param {GetEventsQueryParams} options.queryParams - The query parameters to use for fetching events.
 * @param {GetEventsHeadersInput} options.headersInput - The headers to include in the request.
 */
export class EventStream extends ByteStream {
  _eventsManager: EventsManager;
  _queryParams: GetEventsQueryParams;
  _headersInput: GetEventsHeadersInput;
  _streamPosition: string;
  _longPollingInfo: RealtimeServer | undefined;
  _longPollingRetries: number = 0;
  _started: boolean = false;
  _abortController: AbortController | undefined;
  _deduplicationFilterSize: number = 1000;
  _dedupHash: Map<string, boolean> = new Map();

  constructor(options: {
    eventsManager: EventsManager;
    queryParams: GetEventsQueryParams;
    headersInput: GetEventsHeadersInput;
  }) {
    super({
      objectMode: true,
    });
    this._eventsManager = options.eventsManager;
    this._streamPosition = options.queryParams.streamPosition || 'now';
    this._queryParams = options.queryParams;
    this._headersInput = options.headersInput;
    this._abortController = new AbortController();
    this._dedupHash = new Map<string, boolean>();
  }

  _read(size: number): void {
    if (this.destroyed) {
      return;
    }
    if (!this._started) {
      this._started = true;
      this.fetchEvents();
    }
  }

  _destroy(
    error: Error | null,
    callback: (error?: Error | null) => void,
  ): void {
    this._abortController?.abort('Stream destroyed');
    if (!error) {
      this.push(null);
    }
    callback(error);
  }

  async getLongPollInfo(): Promise<void> {
    if (this.destroyed) {
      return;
    }
    try {
      const info = await this._eventsManager.getEventsWithLongPolling(
        undefined,
        this._abortController?.signal,
      );
      const server =
        info.entries?.find((entry) => entry.type === 'realtime_server') ||
        undefined;
      if (!server) {
        throw new BoxSdkError({
          message: 'No realtime server found in the response.',
        });
      }
      this._longPollingInfo = server;
      this._longPollingRetries = 0;

      return this.doLongPoll();
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        this.emit('error', error);
        return this.getLongPollInfo();
      }
    }
  }

  async doLongPoll(): Promise<void> {
    if (this.destroyed) {
      return;
    }
    try {
      if (
        !this._longPollingInfo ||
        this._longPollingRetries >
          parseInt(this._longPollingInfo?.maxRetries || '10', 10)
      ) {
        return this.getLongPollInfo();
      }
      this._longPollingRetries++;

      const longPollUrl = this._longPollingInfo?.url!;
      const longPollWithStreamPosition = `${longPollUrl}${
        longPollUrl.includes('?') ? '&' : '?'
      }stream_position=${this._streamPosition}`;

      const response =
        await this._eventsManager.networkSession.networkClient.fetch({
          url: longPollWithStreamPosition,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          responseFormat: 'json',
          auth: this._eventsManager.auth,
          networkSession: this._eventsManager.networkSession,
          cancellationToken: this._abortController?.signal,
        });

      if (this.destroyed) {
        return;
      }
      if (response.data) {
        const message = response.data as {
          version: number;
          message: string;
        };

        if (message.message === RealtimeServerEventValue.NEW_CHANGE) {
          return this.fetchEvents();
        } else if (message.message === RealtimeServerEventValue.RECONNECT) {
          return this.getLongPollInfo();
        }
        return this.doLongPoll();
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        this.emit('error', error);
        this.doLongPoll();
      }
    }
  }

  async fetchEvents(): Promise<void> {
    if (this.destroyed) {
      return;
    }

    try {
      const events = await this._eventsManager.getEvents(
        {
          ...this._queryParams,
          ...{
            streamPosition: this._streamPosition,
          },
        },
        this._headersInput,
        this._abortController?.signal,
      );
      this._streamPosition = events.nextStreamPosition?.toString() || 'now';
      if (events.entries) {
        for (const entry of events.entries) {
          if (entry.eventId) {
            if (this._dedupHash.has(entry.eventId)) {
              continue;
            }
            this._dedupHash.set(entry.eventId, true);
          }
          this.push(entry);
        }
        if (this._dedupHash.size >= this._deduplicationFilterSize) {
          for (const [key] of this._dedupHash) {
            if (!events.entries.some((entry) => entry.eventId === key)) {
              this._dedupHash.delete(key);
            }
          }
        }
      }
      return this.doLongPoll();
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        this.emit('error', error);
        this.fetchEvents();
      }
    }
  }
}
