Tasks
=====

Tasks enable file-centric workflows in Box. User can create tasks on files and assign them to collaborators on Box.

* [Create a Task](#create-a-task)

Create a Task
-------------

To create a task call the [`tasks.create(fileID, message, dueAt, callback)`](http://opensource.box.com/box-node-sdk/Tasks.html#create) method.

```js
client.tasks.create(
	'1234',
	'Optional Message',
	'2014-04-03T11:09:43-07:00',
	callback
);
```
