import { serializeUser } from './user';
import { deserializeUser } from './user';
import { serializeEventSource } from './eventSource';
import { deserializeEventSource } from './eventSource';
import { serializeFile } from './file';
import { deserializeFile } from './file';
import { serializeFolder } from './folder';
import { deserializeFolder } from './folder';
import { serializeGenericSource } from './genericSource';
import { deserializeGenericSource } from './genericSource';
import { serializeAppItemEventSource } from './appItemEventSource';
import { deserializeAppItemEventSource } from './appItemEventSource';
import { User } from './user';
import { EventSource } from './eventSource';
import { File } from './file';
import { Folder } from './folder';
import { GenericSource } from './genericSource';
import { AppItemEventSource } from './appItemEventSource';
import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export type EventSourceResource =
  | User
  | EventSource
  | File
  | Folder
  | GenericSource
  | AppItemEventSource;
export function serializeEventSourceResource(val: any): SerializedData {
  if (val.type == 'user') {
    return serializeUser(val);
  }
  if (val.type == 'file') {
    return serializeFile(val);
  }
  if (val.type == 'folder') {
    return serializeFolder(val);
  }
  if (val.type == 'app_item') {
    return serializeAppItemEventSource(val);
  }
  if (val.itemType == 'file') {
    return serializeEventSource(val);
  }
  if (val.itemType == 'folder') {
    return serializeEventSource(val);
  }
  return serializeGenericSource(val);
}
export function deserializeEventSourceResource(
  val: SerializedData,
): EventSourceResource {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EventSourceResource"',
    });
  }
  if (val.type == 'user') {
    return deserializeUser(val);
  }
  if (val.type == 'file') {
    return deserializeFile(val);
  }
  if (val.type == 'folder') {
    return deserializeFolder(val);
  }
  if (val.type == 'app_item') {
    return deserializeAppItemEventSource(val);
  }
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "EventSourceResource"',
    });
  }
  if (val.item_type == 'file') {
    return deserializeEventSource(val);
  }
  if (val.item_type == 'folder') {
    return deserializeEventSource(val);
  }
  try {
    return deserializeGenericSource(val);
  } catch (error) {
    void 0;
  } finally {
  }
  throw new BoxSdkError({ message: "Can't deserialize EventSourceResource" });
}
