import { serializeFiles } from '../schemas/files.generated.js';
import { deserializeFiles } from '../schemas/files.generated.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeDateTime } from '../internal/utils.js';
import { deserializeDateTime } from '../internal/utils.js';
import { serializeTask } from '../schemas/task.generated.js';
import { deserializeTask } from '../schemas/task.generated.js';
import { serializeCreateTaskRequestBody } from '../managers/tasks.generated.js';
import { deserializeCreateTaskRequestBody } from '../managers/tasks.generated.js';
import { serializeCreateTaskRequestBodyItemField } from '../managers/tasks.generated.js';
import { deserializeCreateTaskRequestBodyItemField } from '../managers/tasks.generated.js';
import { serializeCreateTaskRequestBodyItemTypeField } from '../managers/tasks.generated.js';
import { deserializeCreateTaskRequestBodyItemTypeField } from '../managers/tasks.generated.js';
import { serializeCreateTaskRequestBodyActionField } from '../managers/tasks.generated.js';
import { deserializeCreateTaskRequestBodyActionField } from '../managers/tasks.generated.js';
import { serializeCreateTaskRequestBodyCompletionRuleField } from '../managers/tasks.generated.js';
import { deserializeCreateTaskRequestBodyCompletionRuleField } from '../managers/tasks.generated.js';
import { serializeTasks } from '../schemas/tasks.generated.js';
import { deserializeTasks } from '../schemas/tasks.generated.js';
import { serializeUpdateTaskByIdRequestBody } from '../managers/tasks.generated.js';
import { deserializeUpdateTaskByIdRequestBody } from '../managers/tasks.generated.js';
import { UpdateTaskByIdOptionalsInput } from '../managers/tasks.generated.js';
import { UpdateTaskByIdOptionals } from '../managers/tasks.generated.js';
import { BoxClient } from '../client.generated.js';
import { Files } from '../schemas/files.generated.js';
import { UploadFileRequestBody } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.generated.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { DateTime } from '../internal/utils.js';
import { Task } from '../schemas/task.generated.js';
import { CreateTaskRequestBody } from '../managers/tasks.generated.js';
import { CreateTaskRequestBodyItemField } from '../managers/tasks.generated.js';
import { CreateTaskRequestBodyItemTypeField } from '../managers/tasks.generated.js';
import { CreateTaskRequestBodyActionField } from '../managers/tasks.generated.js';
import { CreateTaskRequestBodyCompletionRuleField } from '../managers/tasks.generated.js';
import { Tasks } from '../schemas/tasks.generated.js';
import { UpdateTaskByIdRequestBody } from '../managers/tasks.generated.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { dateTimeFromString } from '../internal/utils.js';
import { dateTimeToString } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
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
