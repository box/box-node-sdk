import { serializeFiles } from '../schemas/files.js';
import { deserializeFiles } from '../schemas/files.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { serializeTask } from '../schemas/task.js';
import { deserializeTask } from '../schemas/task.js';
import { serializeCreateTaskRequestBody } from '../managers/tasks.js';
import { deserializeCreateTaskRequestBody } from '../managers/tasks.js';
import { serializeCreateTaskRequestBodyItemField } from '../managers/tasks.js';
import { deserializeCreateTaskRequestBodyItemField } from '../managers/tasks.js';
import { serializeCreateTaskRequestBodyItemTypeField } from '../managers/tasks.js';
import { deserializeCreateTaskRequestBodyItemTypeField } from '../managers/tasks.js';
import { serializeCreateTaskRequestBodyActionField } from '../managers/tasks.js';
import { deserializeCreateTaskRequestBodyActionField } from '../managers/tasks.js';
import { serializeCreateTaskRequestBodyCompletionRuleField } from '../managers/tasks.js';
import { deserializeCreateTaskRequestBodyCompletionRuleField } from '../managers/tasks.js';
import { serializeTasks } from '../schemas/tasks.js';
import { deserializeTasks } from '../schemas/tasks.js';
import { serializeUpdateTaskByIdRequestBody } from '../managers/tasks.js';
import { deserializeUpdateTaskByIdRequestBody } from '../managers/tasks.js';
import { UpdateTaskByIdOptionalsInput } from '../managers/tasks.js';
import { UpdateTaskByIdOptionals } from '../managers/tasks.js';
import { BoxClient } from '../client.js';
import { Files } from '../schemas/files.js';
import { UploadFileRequestBody } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { FileFull } from '../schemas/fileFull.js';
import { DateTime } from '../internal/utils.js';
import { Task } from '../schemas/task.js';
import { CreateTaskRequestBody } from '../managers/tasks.js';
import { CreateTaskRequestBodyItemField } from '../managers/tasks.js';
import { CreateTaskRequestBodyItemTypeField } from '../managers/tasks.js';
import { CreateTaskRequestBodyActionField } from '../managers/tasks.js';
import { CreateTaskRequestBodyCompletionRuleField } from '../managers/tasks.js';
import { Tasks } from '../schemas/tasks.js';
import { UpdateTaskByIdRequestBody } from '../managers/tasks.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { dateTimeFromString } from '../internal/utils.js';
import { dateTimeToString } from '../internal/utils.js';
import { getDefaultClient } from './commons.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testCreateUpdateGetDeleteTask', async function testCreateUpdateGetDeleteTask(): Promise<any> {
  const files: Files = await client.uploads.uploadFile({
    attributes: {
      name: getUuid(),
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: generateByteStream(10),
  } satisfies UploadFileRequestBody);
  const file: FileFull = files.entries![0];
  const dateTime: DateTime = dateTimeFromString('2035-01-01T00:00:00Z');
  const task: Task = await client.tasks.createTask({
    item: {
      type: 'file' as CreateTaskRequestBodyItemTypeField,
      id: file.id,
    } satisfies CreateTaskRequestBodyItemField,
    message: 'test message',
    dueAt: dateTime,
    action: 'review' as CreateTaskRequestBodyActionField,
    completionRule: 'all_assignees' as CreateTaskRequestBodyCompletionRuleField,
  } satisfies CreateTaskRequestBody);
  if (!(task.message == 'test message')) {
    throw new Error('Assertion failed');
  }
  if (!(task.item!.id == file.id)) {
    throw new Error('Assertion failed');
  }
  if (!(dateTimeToString(task.dueAt!) == dateTimeToString(dateTime))) {
    throw new Error('Assertion failed');
  }
  const taskById: Task = await client.tasks.getTaskById(task.id!);
  if (!(taskById.id == task.id)) {
    throw new Error('Assertion failed');
  }
  const taskOnFile: Tasks = await client.tasks.getFileTasks(file.id);
  if (!(taskOnFile.totalCount == 1)) {
    throw new Error('Assertion failed');
  }
  const updatedTask: Task = await client.tasks.updateTaskById(task.id!, {
    requestBody: {
      message: 'updated message',
    } satisfies UpdateTaskByIdRequestBody,
  } satisfies UpdateTaskByIdOptionalsInput);
  if (!(updatedTask.message == 'updated message')) {
    throw new Error('Assertion failed');
  }
  await client.tasks.deleteTaskById(task.id!);
  await client.files.deleteFileById(file.id);
});
export {};
