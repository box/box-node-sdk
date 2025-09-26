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
import { serializeUserFull } from '@/schemas/userFull';
import { deserializeUserFull } from '@/schemas/userFull';
import { serializeTaskAssignment } from '@/schemas/taskAssignment';
import { deserializeTaskAssignment } from '@/schemas/taskAssignment';
import { serializeCreateTaskAssignmentRequestBody } from '@/managers/taskAssignments';
import { deserializeCreateTaskAssignmentRequestBody } from '@/managers/taskAssignments';
import { serializeCreateTaskAssignmentRequestBodyTaskField } from '@/managers/taskAssignments';
import { deserializeCreateTaskAssignmentRequestBodyTaskField } from '@/managers/taskAssignments';
import { serializeCreateTaskAssignmentRequestBodyTaskTypeField } from '@/managers/taskAssignments';
import { deserializeCreateTaskAssignmentRequestBodyTaskTypeField } from '@/managers/taskAssignments';
import { serializeCreateTaskAssignmentRequestBodyAssignToField } from '@/managers/taskAssignments';
import { deserializeCreateTaskAssignmentRequestBodyAssignToField } from '@/managers/taskAssignments';
import { serializeTaskAssignments } from '@/schemas/taskAssignments';
import { deserializeTaskAssignments } from '@/schemas/taskAssignments';
import { serializeUpdateTaskAssignmentByIdRequestBody } from '@/managers/taskAssignments';
import { deserializeUpdateTaskAssignmentByIdRequestBody } from '@/managers/taskAssignments';
import { serializeUpdateTaskAssignmentByIdRequestBodyResolutionStateField } from '@/managers/taskAssignments';
import { deserializeUpdateTaskAssignmentByIdRequestBodyResolutionStateField } from '@/managers/taskAssignments';
import { UpdateTaskAssignmentByIdOptionalsInput } from '@/managers/taskAssignments';
import { UpdateTaskAssignmentByIdOptionals } from '@/managers/taskAssignments';
import { BoxClient } from '@/client';
import { FileFull } from '@/schemas/fileFull';
import { DateTime } from '@/internal/utils';
import { Task } from '@/schemas/task';
import { CreateTaskRequestBody } from '@/managers/tasks';
import { CreateTaskRequestBodyItemField } from '@/managers/tasks';
import { CreateTaskRequestBodyItemTypeField } from '@/managers/tasks';
import { CreateTaskRequestBodyActionField } from '@/managers/tasks';
import { CreateTaskRequestBodyCompletionRuleField } from '@/managers/tasks';
import { UserFull } from '@/schemas/userFull';
import { TaskAssignment } from '@/schemas/taskAssignment';
import { CreateTaskAssignmentRequestBody } from '@/managers/taskAssignments';
import { CreateTaskAssignmentRequestBodyTaskField } from '@/managers/taskAssignments';
import { CreateTaskAssignmentRequestBodyTaskTypeField } from '@/managers/taskAssignments';
import { CreateTaskAssignmentRequestBodyAssignToField } from '@/managers/taskAssignments';
import { TaskAssignments } from '@/schemas/taskAssignments';
import { UpdateTaskAssignmentByIdRequestBody } from '@/managers/taskAssignments';
import { UpdateTaskAssignmentByIdRequestBodyResolutionStateField } from '@/managers/taskAssignments';
import { uploadNewFile } from './commons';
import { getDefaultClient } from './commons';
import { dateTimeFromString } from '@/internal/utils';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testCreateUpdateGetDeleteTaskAssignment', async function testCreateUpdateGetDeleteTaskAssignment(): Promise<any> {
  const file: FileFull = await uploadNewFile();
  const date: DateTime = dateTimeFromString('2035-01-01T00:00:00Z');
  const task: Task = await client.tasks.createTask({
    item: {
      type: 'file' as CreateTaskRequestBodyItemTypeField,
      id: file.id,
    } satisfies CreateTaskRequestBodyItemField,
    message: 'test message',
    dueAt: date,
    action: 'review' as CreateTaskRequestBodyActionField,
    completionRule: 'all_assignees' as CreateTaskRequestBodyCompletionRuleField,
  } satisfies CreateTaskRequestBody);
  if (!(task.message == 'test message')) {
    throw new Error('Assertion failed');
  }
  if (!(task.item!.id == file.id)) {
    throw new Error('Assertion failed');
  }
  const currentUser: UserFull = await client.users.getUserMe();
  const taskAssignment: TaskAssignment =
    await client.taskAssignments.createTaskAssignment({
      task: new CreateTaskAssignmentRequestBodyTaskField({
        type: 'task' as CreateTaskAssignmentRequestBodyTaskTypeField,
        id: task.id!,
      }),
      assignTo: {
        id: currentUser.id,
      } satisfies CreateTaskAssignmentRequestBodyAssignToField,
    } satisfies CreateTaskAssignmentRequestBody);
  if (!(taskAssignment.item!.id == file.id)) {
    throw new Error('Assertion failed');
  }
  if (!(taskAssignment.assignedTo!.id == currentUser.id)) {
    throw new Error('Assertion failed');
  }
  const taskAssignmentById: TaskAssignment =
    await client.taskAssignments.getTaskAssignmentById(taskAssignment.id!);
  if (!(taskAssignmentById.id == taskAssignment.id)) {
    throw new Error('Assertion failed');
  }
  const taskAssignmentsOnTask: TaskAssignments =
    await client.taskAssignments.getTaskAssignments(task.id!);
  if (!(taskAssignmentsOnTask.totalCount! == 1)) {
    throw new Error('Assertion failed');
  }
  const updatedTaskAssignment: TaskAssignment =
    await client.taskAssignments.updateTaskAssignmentById(taskAssignment.id!, {
      requestBody: {
        message: 'updated message',
        resolutionState:
          'approved' as UpdateTaskAssignmentByIdRequestBodyResolutionStateField,
      } satisfies UpdateTaskAssignmentByIdRequestBody,
    } satisfies UpdateTaskAssignmentByIdOptionalsInput);
  if (!(updatedTaskAssignment.message == 'updated message')) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(updatedTaskAssignment.resolutionState) as string) == 'approved')
  ) {
    throw new Error('Assertion failed');
  }
  await expect(async () => {
    await client.taskAssignments.deleteTaskAssignmentById(taskAssignment.id!);
  }).rejects.toThrow();
  await client.files.deleteFileById(file.id);
});
export {};
