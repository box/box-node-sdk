import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeDateTime } from '@/internal/utils';
import { deserializeDateTime } from '@/internal/utils';
import { serializeTask } from '@/schemas/task';
import { deserializeTask } from '@/schemas/task';
import { serializeCreateTaskRequestBody } from '@/managers/tasks';
import { deserializeCreateTaskRequestBody } from '@/managers/tasks';
import { serializeCreateTaskRequestBodyItemField } from '@/managers/tasks';
import { deserializeCreateTaskRequestBodyItemField } from '@/managers/tasks';
import { serializeCreateTaskRequestBodyItemTypeField } from '@/managers/tasks';
import { deserializeCreateTaskRequestBodyItemTypeField } from '@/managers/tasks';
import { serializeCreateTaskRequestBodyActionField } from '@/managers/tasks';
import { deserializeCreateTaskRequestBodyActionField } from '@/managers/tasks';
import { serializeCreateTaskRequestBodyCompletionRuleField } from '@/managers/tasks';
import { deserializeCreateTaskRequestBodyCompletionRuleField } from '@/managers/tasks';
import { serializeTasks } from '@/schemas/tasks';
import { deserializeTasks } from '@/schemas/tasks';
import { serializeUpdateTaskByIdRequestBody } from '@/managers/tasks';
import { deserializeUpdateTaskByIdRequestBody } from '@/managers/tasks';
import { UpdateTaskByIdOptionalsInput } from '@/managers/tasks';
import { UpdateTaskByIdOptionals } from '@/managers/tasks';
import { BoxClient } from '@/client';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { FileFull } from '@/schemas/fileFull';
import { DateTime } from '@/internal/utils';
import { Task } from '@/schemas/task';
import { CreateTaskRequestBody } from '@/managers/tasks';
import { CreateTaskRequestBodyItemField } from '@/managers/tasks';
import { CreateTaskRequestBodyItemTypeField } from '@/managers/tasks';
import { CreateTaskRequestBodyActionField } from '@/managers/tasks';
import { CreateTaskRequestBodyCompletionRuleField } from '@/managers/tasks';
import { Tasks } from '@/schemas/tasks';
import { UpdateTaskByIdRequestBody } from '@/managers/tasks';
import { getUuid } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { dateTimeFromString } from '@/internal/utils';
import { dateTimeToString } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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
