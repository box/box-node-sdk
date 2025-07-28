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
import { serializeUserFull } from '../schemas/userFull.generated.js';
import { deserializeUserFull } from '../schemas/userFull.generated.js';
import { serializeTaskAssignment } from '../schemas/taskAssignment.generated.js';
import { deserializeTaskAssignment } from '../schemas/taskAssignment.generated.js';
import { serializeCreateTaskAssignmentRequestBody } from '../managers/taskAssignments.generated.js';
import { deserializeCreateTaskAssignmentRequestBody } from '../managers/taskAssignments.generated.js';
import { serializeCreateTaskAssignmentRequestBodyTaskField } from '../managers/taskAssignments.generated.js';
import { deserializeCreateTaskAssignmentRequestBodyTaskField } from '../managers/taskAssignments.generated.js';
import { serializeCreateTaskAssignmentRequestBodyTaskTypeField } from '../managers/taskAssignments.generated.js';
import { deserializeCreateTaskAssignmentRequestBodyTaskTypeField } from '../managers/taskAssignments.generated.js';
import { serializeCreateTaskAssignmentRequestBodyAssignToField } from '../managers/taskAssignments.generated.js';
import { deserializeCreateTaskAssignmentRequestBodyAssignToField } from '../managers/taskAssignments.generated.js';
import { serializeTaskAssignments } from '../schemas/taskAssignments.generated.js';
import { deserializeTaskAssignments } from '../schemas/taskAssignments.generated.js';
import { serializeUpdateTaskAssignmentByIdRequestBody } from '../managers/taskAssignments.generated.js';
import { deserializeUpdateTaskAssignmentByIdRequestBody } from '../managers/taskAssignments.generated.js';
import { serializeUpdateTaskAssignmentByIdRequestBodyResolutionStateField } from '../managers/taskAssignments.generated.js';
import { deserializeUpdateTaskAssignmentByIdRequestBodyResolutionStateField } from '../managers/taskAssignments.generated.js';
import { UpdateTaskAssignmentByIdOptionalsInput } from '../managers/taskAssignments.generated.js';
import { UpdateTaskAssignmentByIdOptionals } from '../managers/taskAssignments.generated.js';
import { BoxClient } from '../client.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { DateTime } from '../internal/utils.js';
import { Task } from '../schemas/task.generated.js';
import { CreateTaskRequestBody } from '../managers/tasks.generated.js';
import { CreateTaskRequestBodyItemField } from '../managers/tasks.generated.js';
import { CreateTaskRequestBodyItemTypeField } from '../managers/tasks.generated.js';
import { CreateTaskRequestBodyActionField } from '../managers/tasks.generated.js';
import { CreateTaskRequestBodyCompletionRuleField } from '../managers/tasks.generated.js';
import { UserFull } from '../schemas/userFull.generated.js';
import { TaskAssignment } from '../schemas/taskAssignment.generated.js';
import { CreateTaskAssignmentRequestBody } from '../managers/taskAssignments.generated.js';
import { CreateTaskAssignmentRequestBodyTaskField } from '../managers/taskAssignments.generated.js';
import { CreateTaskAssignmentRequestBodyTaskTypeField } from '../managers/taskAssignments.generated.js';
import { CreateTaskAssignmentRequestBodyAssignToField } from '../managers/taskAssignments.generated.js';
import { TaskAssignments } from '../schemas/taskAssignments.generated.js';
import { UpdateTaskAssignmentByIdRequestBody } from '../managers/taskAssignments.generated.js';
import { UpdateTaskAssignmentByIdRequestBodyResolutionStateField } from '../managers/taskAssignments.generated.js';
import { uploadNewFile } from './commons.generated.js';
import { getDefaultClient } from './commons.generated.js';
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
