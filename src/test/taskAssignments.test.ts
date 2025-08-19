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
import { serializeUserFull } from '../schemas/userFull.js';
import { deserializeUserFull } from '../schemas/userFull.js';
import { serializeTaskAssignment } from '../schemas/taskAssignment.js';
import { deserializeTaskAssignment } from '../schemas/taskAssignment.js';
import { serializeCreateTaskAssignmentRequestBody } from '../managers/taskAssignments.js';
import { deserializeCreateTaskAssignmentRequestBody } from '../managers/taskAssignments.js';
import { serializeCreateTaskAssignmentRequestBodyTaskField } from '../managers/taskAssignments.js';
import { deserializeCreateTaskAssignmentRequestBodyTaskField } from '../managers/taskAssignments.js';
import { serializeCreateTaskAssignmentRequestBodyTaskTypeField } from '../managers/taskAssignments.js';
import { deserializeCreateTaskAssignmentRequestBodyTaskTypeField } from '../managers/taskAssignments.js';
import { serializeCreateTaskAssignmentRequestBodyAssignToField } from '../managers/taskAssignments.js';
import { deserializeCreateTaskAssignmentRequestBodyAssignToField } from '../managers/taskAssignments.js';
import { serializeTaskAssignments } from '../schemas/taskAssignments.js';
import { deserializeTaskAssignments } from '../schemas/taskAssignments.js';
import { serializeUpdateTaskAssignmentByIdRequestBody } from '../managers/taskAssignments.js';
import { deserializeUpdateTaskAssignmentByIdRequestBody } from '../managers/taskAssignments.js';
import { serializeUpdateTaskAssignmentByIdRequestBodyResolutionStateField } from '../managers/taskAssignments.js';
import { deserializeUpdateTaskAssignmentByIdRequestBodyResolutionStateField } from '../managers/taskAssignments.js';
import { UpdateTaskAssignmentByIdOptionalsInput } from '../managers/taskAssignments.js';
import { UpdateTaskAssignmentByIdOptionals } from '../managers/taskAssignments.js';
import { BoxClient } from '../client.js';
import { FileFull } from '../schemas/fileFull.js';
import { DateTime } from '../internal/utils.js';
import { Task } from '../schemas/task.js';
import { CreateTaskRequestBody } from '../managers/tasks.js';
import { CreateTaskRequestBodyItemField } from '../managers/tasks.js';
import { CreateTaskRequestBodyItemTypeField } from '../managers/tasks.js';
import { CreateTaskRequestBodyActionField } from '../managers/tasks.js';
import { CreateTaskRequestBodyCompletionRuleField } from '../managers/tasks.js';
import { UserFull } from '../schemas/userFull.js';
import { TaskAssignment } from '../schemas/taskAssignment.js';
import { CreateTaskAssignmentRequestBody } from '../managers/taskAssignments.js';
import { CreateTaskAssignmentRequestBodyTaskField } from '../managers/taskAssignments.js';
import { CreateTaskAssignmentRequestBodyTaskTypeField } from '../managers/taskAssignments.js';
import { CreateTaskAssignmentRequestBodyAssignToField } from '../managers/taskAssignments.js';
import { TaskAssignments } from '../schemas/taskAssignments.js';
import { UpdateTaskAssignmentByIdRequestBody } from '../managers/taskAssignments.js';
import { UpdateTaskAssignmentByIdRequestBodyResolutionStateField } from '../managers/taskAssignments.js';
import { uploadNewFile } from './commons.js';
import { getDefaultClient } from './commons.js';
import { dateTimeFromString } from '../internal/utils.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
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
