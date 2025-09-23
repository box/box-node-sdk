# TaskAssignmentsManager

- [List task assignments](#list-task-assignments)
- [Assign task](#assign-task)
- [Get task assignment](#get-task-assignment)
- [Update task assignment](#update-task-assignment)
- [Unassign task](#unassign-task)

## List task assignments

Lists all of the assignments for a given task.

This operation is performed by calling function `getTaskAssignments`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-tasks-id-assignments/).

<!-- sample get_tasks_id_assignments -->

```ts
await client.taskAssignments.getTaskAssignments(task.id!);
```

### Arguments

- taskId `string`
  - The ID of the task. Example: "12345"
- optionalsInput `GetTaskAssignmentsOptionalsInput`

### Returns

This function returns a value of type `TaskAssignments`.

Returns a collection of task assignment defining what task on
a file has been assigned to which users and by who.

## Assign task

Assigns a task to a user.

A task can be assigned to more than one user by creating multiple
assignments.

This operation is performed by calling function `createTaskAssignment`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/post-task-assignments/).

<!-- sample post_task_assignments -->

```ts
await client.taskAssignments.createTaskAssignment({
  task: new CreateTaskAssignmentRequestBodyTaskField({
    type: 'task' as CreateTaskAssignmentRequestBodyTaskTypeField,
    id: task.id!,
  }),
  assignTo: {
    id: currentUser.id,
  } satisfies CreateTaskAssignmentRequestBodyAssignToField,
} satisfies CreateTaskAssignmentRequestBody);
```

### Arguments

- requestBody `CreateTaskAssignmentRequestBody`
  - Request body of createTaskAssignment method
- optionalsInput `CreateTaskAssignmentOptionalsInput`

### Returns

This function returns a value of type `TaskAssignment`.

Returns a new task assignment object.

## Get task assignment

Retrieves information about a task assignment.

This operation is performed by calling function `getTaskAssignmentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/get-task-assignments-id/).

<!-- sample get_task_assignments_id -->

```ts
await client.taskAssignments.getTaskAssignmentById(taskAssignment.id!);
```

### Arguments

- taskAssignmentId `string`
  - The ID of the task assignment. Example: "12345"
- optionalsInput `GetTaskAssignmentByIdOptionalsInput`

### Returns

This function returns a value of type `TaskAssignment`.

Returns a task assignment, specifying who the task has been assigned to
and by whom.

## Update task assignment

Updates a task assignment. This endpoint can be
used to update the state of a task assigned to a user.

This operation is performed by calling function `updateTaskAssignmentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/put-task-assignments-id/).

<!-- sample put_task_assignments_id -->

```ts
await client.taskAssignments.updateTaskAssignmentById(taskAssignment.id!, {
  requestBody: {
    message: 'updated message',
    resolutionState:
      'approved' as UpdateTaskAssignmentByIdRequestBodyResolutionStateField,
  } satisfies UpdateTaskAssignmentByIdRequestBody,
} satisfies UpdateTaskAssignmentByIdOptionalsInput);
```

### Arguments

- taskAssignmentId `string`
  - The ID of the task assignment. Example: "12345"
- optionalsInput `UpdateTaskAssignmentByIdOptionalsInput`

### Returns

This function returns a value of type `TaskAssignment`.

Returns the updated task assignment object.

## Unassign task

Deletes a specific task assignment.

This operation is performed by calling function `deleteTaskAssignmentById`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/delete-task-assignments-id/).

<!-- sample delete_task_assignments_id -->

```ts
await client.taskAssignments.deleteTaskAssignmentById(taskAssignment.id!);
```

### Arguments

- taskAssignmentId `string`
  - The ID of the task assignment. Example: "12345"
- optionalsInput `DeleteTaskAssignmentByIdOptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the task
assignment was successfully deleted.
