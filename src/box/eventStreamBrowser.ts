import { BoxSdkError } from './errors';

export class EventStream extends ReadableStream<any> {
  constructor(options: {
    eventsManager: any;
    queryParams: any;
    headersInput: any;
  }) {
    super();
    throw new BoxSdkError({
      message: 'EventStream is not supported in the browser environment.',
    });
  }
}
