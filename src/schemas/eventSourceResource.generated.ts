import { serializeUser } from './user.generated.js';
import { deserializeUser } from './user.generated.js';
import { serializeEventSource } from './eventSource.generated.js';
import { deserializeEventSource } from './eventSource.generated.js';
import { serializeFile } from './file.generated.js';
import { deserializeFile } from './file.generated.js';
import { serializeFolder } from './folder.generated.js';
import { deserializeFolder } from './folder.generated.js';
import { serializeGenericSource } from './genericSource.generated.js';
import { deserializeGenericSource } from './genericSource.generated.js';
import { serializeAppItemEventSource } from './appItemEventSource.generated.js';
import { deserializeAppItemEventSource } from './appItemEventSource.generated.js';
import { User } from './user.generated.js';
import { EventSource } from './eventSource.generated.js';
import { File } from './file.generated.js';
import { Folder } from './folder.generated.js';
import { GenericSource } from './genericSource.generated.js';
import { AppItemEventSource } from './appItemEventSource.generated.js';
import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
