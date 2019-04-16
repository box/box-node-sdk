Tasks
=====

Tasks enable file-centric workflows in Box. User can create tasks on files and assign them to collaborators on Box.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Create a Task](#create-a-task)
- [Get a Task's Information](#get-a-tasks-information)
- [Update a Task](#update-a-task)
- [Delete a Task](#delete-a-task)
- [Get Assignments for a Task](#get-assignments-for-a-task)
- [Get Task Assignment](#get-task-assignment)
- [Assign Task](#assign-task)
- [Update Task Assignment](#update-task-assignment)
- [Remove Task Assignment](#remove-task-assignment)
- [Get Tasks on a File](#get-tasks-on-a-file)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Create a Task
-------------

To create a task call the [`tasks.create(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Tasks.html#create) method.

<!-- sample post_tasks-->
```js
var options = {
	message: 'Please review for publication!',
	due_at: '2014-04-03T11:09:43-07:00'
};
client.tasks.create('22222', options)
	.then(task => {
		/* task -> {
			type: 'task',
			id: '11111',
			item: 
			{ type: 'file',
				id: '22222',
				sequence_id: '0',
				etag: '0',
				sha1: '0bbd79a105c504f99573e3799756debba4c760cd',
				name: 'box-logo.png' },
			due_at: '2014-04-03T11:09:43-07:00',
			action: 'review',
			message: 'Please review for publication!',
			task_assignment_collection: { total_count: 0, entries: [] },
			is_completed: false,
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2013-04-03T11:12:54-07:00' }
		*/
	});
```

Get a Task's Information
------------------------

To get a task information call the [`tasks.get(taskID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Tasks.html#get) method.

<!-- sample get_tasks_id -->
```js
client.tasks.get('11111')
	.then(task => {
		/* task -> {
			type: 'task',
			id: '11111',
			item: 
			{ type: 'file',
				id: '22222',
				sequence_id: '0',
				etag: '0',
				sha1: '0bbd79a105c504f99573e3799756debba4c760cd',
				name: 'box-logo.png' },
			due_at: '2014-04-03T11:09:43-07:00',
			action: 'review',
			message: 'Please review for publication!',
			task_assignment_collection: { total_count: 0, entries: [] },
			is_completed: false,
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2013-04-03T11:12:54-07:00' }
		*/
	});
```

Requesting information for only the fields you need with the `fields` option
can improve performance and reduce the size of the network request.

```js
client.tasks.get('11111', {fields: 'message,is_completed'})
	.then(task => {
		/* task -> {
			type: 'task',
			id: '11111',
			message: 'Please review for publication!',
			is_completed: false }
		*/
	});
```

Update a Task
-------------

To update a task call the
[`tasks.update(taskID, updates, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Tasks.html#update)
method with the set of fields to update and their new values.

<!-- sample put_tasks_id -->
```js
client.tasks.update('11111', { message: 'Could you please review?' })
	.then(task => {
		/* task -> {
			type: 'task',
			id: '11111',
			item: 
			{ type: 'file',
				id: '22222',
				sequence_id: '0',
				etag: '0',
				sha1: '0bbd79a105c504f99573e3799756debba4c760cd',
				name: 'box-logo.png' },
			due_at: '2014-04-03T11:09:43-07:00',
			action: 'review',
			message: 'Could you please review?',
			task_assignment_collection: { total_count: 0, entries: [] },
			is_completed: false,
			created_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' },
			created_at: '2013-04-03T11:12:54-07:00' }
		*/
	});
```

Delete a Task
-------------

To delete a task, call the
[`tasks.delete(taskID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Tasks.html#delete)
method with the ID of the task to be deleted.

<!-- sample delete_tasks_id -->
```js
client.tasks.delete('11111')
	.then(() => {
		// deletion succeeded — no value returned
	});
```

Get Assignments for a Task
--------------------------

To get a list of assignments for a task, which associate the task to users who
must complete it, call the
[`tasks.getAssignments(taskID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Tasks.html#getAssignments)
method.

<!-- sample get_tasks_id_assignments -->
```js
client.tasks.getAssignments('11111')
	.then(assignments => {
		/* assignments -> {
			total_count: 1,
			entries: 
			[ { type: 'task_assignment',
				id: '22222',
				item: 
					{ type: 'file',
					id: '44444',
					sequence_id: '0',
					etag: '0',
					sha1: '0bbd79a105c504f99573e3799756debba4c760cd',
					name: 'box-logo.png' },
				assigned_to: 
					{ type: 'user',
					id: '33333',
					name: 'Example User',
					login: 'user@example.com' } } ] }
		*/
	});
```

Get Task Assignment
-------------------

To retrieve information about a specific task assignment, call the
[`tasks.getAssignment(assignmentID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Tasks.html#getAssignment)
method with the ID of the assignment to get.

<!-- sample get_task_assignments_id -->
```js
client.tasks.getAssignment('12345')
	.then(assignment => {
		/* assignment -> {
			type: 'task_assignment',
			id: '12345',
			item: 
			{ type: 'file',
				id: '33333',
				sequence_id: '0',
				etag: '0',
				sha1: '7840095ee096ee8297676a138d4e316eabb3ec96',
				name: 'script.js' },
			assigned_to: 
			{ type: 'user',
				id: '22222',
				name: 'Sample Assignee',
				login: 'assignee@exmaple.com' },
			message: null,
			completed_at: null,
			assigned_at: '2013-05-10T11:43:41-07:00',
			reminded_at: null,
			resolution_state: 'incomplete',
			assigned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' } }
		*/
	});
```

Assign Task
-----------

To assign a task to a user, call
[`tasks.assignByUserID(taskID, userID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Tasks.html#assignByUserID)
or
[`tasks.assignByEmail(taskID, email, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Tasks.html#assignByEmail)
with the ID of the task to assign and either the ID or login email address of the
user to whom the task should be assigned.

<!-- sample post_task_assignments -->
```js
// Assign task 11111 to user 22222
var taskID = '11111';
var userID = '22222';
client.tasks.assignByUserID(taskID, userID)
	.then(assignment => {
		/* assignment -> {
			type: 'task_assignment',
			id: '12345',
			item: 
			{ type: 'file',
				id: '33333',
				sequence_id: '0',
				etag: '0',
				sha1: '7840095ee096ee8297676a138d4e316eabb3ec96',
				name: 'script.js' },
			assigned_to: 
			{ type: 'user',
				id: '22222',
				name: 'Sample Assignee',
				login: 'assignee@exmaple.com' },
			message: null,
			completed_at: null,
			assigned_at: '2013-05-10T11:43:41-07:00',
			reminded_at: null,
			resolution_state: 'incomplete',
			assigned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' } }
		*/
	});
```

```js
// Assign task 11111 to the user with email address assignee@exmaple.com
client.tasks.assignByEmail('11111', 'assignee@example.com')
	.then(assignment => {
		// ...
	});
```

Update Task Assignment
----------------------

To update a task assignment, call the
[`tasks.updateAssignment(assignmentID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Tasks.html#updateAssignment)
method.  This can be used to resolve or complete a task.

<!-- sample put_task_assignments_id -->
```js
// Complete a task
client.tasks.updateAssignment(
	'12345',
	{
		message: 'Done!',
		resolution_state: client.tasks.resolutionStates.COMPLETE
	})
	.then(assignment => {
		/* assignment -> {
			type: 'task_assignment',
			id: '12345',
			item: 
			{ type: 'file',
				id: '33333',
				sequence_id: '0',
				etag: '0',
				sha1: '7840095ee096ee8297676a138d4e316eabb3ec96',
				name: 'script.js' },
			assigned_to: 
			{ type: 'user',
				id: '22222',
				name: 'Sample Assignee',
				login: 'assignee@exmaple.com' },
			message: 'Done!',
			completed_at: null,
			assigned_at: '2013-05-10T11:43:41-07:00',
			reminded_at: null,
			resolution_state: 'complete',
			assigned_by: 
			{ type: 'user',
				id: '33333',
				name: 'Example User',
				login: 'user@example.com' } }
		*/
	});
```

```js
// Mark the task as "Rejected"
client.tasks.updateAssignment(
	'12345',
	{
		message: 'This needs some more changes',
		resolution_state: client.tasks.resolutionStates.REJECTED
	})
	.then(assignment => {
		// ...
	});
```

Remove Task Assignment
----------------------

To delete a task assignment, effectively unassigning a user from the task, call the
[`tasks.deleteAssignment(assignmentID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Tasks.html#deleteAssignment)
method with the ID of the assignment to remove.

<!-- sample delete_task_assignments_id -->
```js
client.tasks.deleteAssignment('12345')
	.then(() => {
		// deletion succeeded — no value returned
	});
```

Get Tasks on a File
-------------------

Calling the
[`files.getTasks(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Files.html#getTasks)
method will retrieve all of the tasks for given file.

<!-- sample get_files_id_tasks-->
```js
client.files.getTasks('11111')
	.then(tasks => {
		/* tasks -> {
			total_count: 1,
			entries: 
			[ { type: 'task',
				id: '22222',
				item: 
					{ type: 'file',
					id: '11111',
					sequence_id: '6',
					etag: '6',
					sha1: '81cc829fb8366fcfc108aa6c5a9bde01a6a10c16',
					name: 'box-logo.png' },
				due_at: null } ] }
		*/
	});
```
