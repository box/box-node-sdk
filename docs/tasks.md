Tasks
=====

Tasks enable file-centric workflows in Box. User can create tasks on files and assign them to collaborators on Box.

* [Create a Task](#create-a-task)
* [Get a Task's Information](#get-a-tasks-information)
* [Delete a Task Permanently](#delete-a-task-permanently)

Create a Task
-------------

To create a task call the [`tasks.create(fileID, options, callback)`](http://opensource.box.com/box-node-sdk/Tasks.html#create) method.

```js
client.tasks.create(
	'1234',
	{
		message: 'Optional Message',
		dueAt: '2014-04-03T11:09:43-07:00'
	},
	callback
);

```
Delete a Task Permanently
-------------------------

To delete a task permanently call the [`tasks.deletePermanently(taskID, callback)`](http://opensource.box.com/box-node-sdk/Tasks.html#deletePermanently) method.

```js
client.tasks.deletePermanently('1234', callback);
```

Get a Task's Information
------------------------

To get a task information call the [`tasks.get(taskID, qs, callback)`](http://opensource.box.com/box-node-sdk/Tasks.html#get) method.

```js
client.tasks.get('1234', null, callback);
```

Requesting information for only the fields you need with the `fields` query
string parameter can improve performance and reduce the size of the network
request.

```js
client.tasks.get('1234', {fields: 'message,is_completed'}, callback);
```
