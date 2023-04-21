import { tasksReducer, TasksStateType, tasksThunks } from '../features/todolists-list/tasks/taskSlice'
import { TaskPriorities, TaskStatuses } from './types/common.types'

let startState: TasksStateType = {}
beforeEach(() => {
	startState = {
		todolistId1: [
			{
				id: '1',
				title: 'CSS',
				status: TaskStatuses.New,
				todoListId: 'todolistId1',
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			},
			{
				id: '2',
				title: 'JS',
				status: TaskStatuses.Completed,
				todoListId: 'todolistId1',
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			},
			{
				id: '3',
				title: 'React',
				status: TaskStatuses.New,
				todoListId: 'todolistId1',
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			}
		],
		todolistId2: [
			{
				id: '1',
				title: 'bread',
				status: TaskStatuses.New,
				todoListId: 'todolistId2',
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			},
			{
				id: '2',
				title: 'milk',
				status: TaskStatuses.Completed,
				todoListId: 'todolistId2',
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			},
			{
				id: '3',
				title: 'tea',
				status: TaskStatuses.New,
				todoListId: 'todolistId2',
				description: '',
				startDate: '',
				deadline: '',
				addedDate: '',
				order: 0,
				priority: TaskPriorities.Low
			}
		]
	}
})

test('correct task should be added to correct array', () => {
	//const action = addTaskAC("juce", "todolistId2");

	const task = {
		todoListId: 'todolistId2',
		title: 'juce',
		status: TaskStatuses.New,
		addedDate: '',
		deadline: '',
		description: '',
		order: 0,
		priority: 0,
		startDate: '',
		id: 'id exists'
	}

	const action = tasksThunks.addTask.fulfilled({ task }, 'requestId', {
		title: task.title,
		id: task.todoListId
	})

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(4)
	expect(endState['todolistId2'][0].id).toBeDefined()
	expect(endState['todolistId2'][0].title).toBe('juce')
	expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('tasks should be added for todolist', () => {
	const action = tasksThunks.fetchTasks.fulfilled(
		{
			tasks: startState['todolistId1'],
			todolistId: 'todolistId1'
		},
		'requestId',
		'todolistId1'
	)

	const endState = tasksReducer(
		{
			todolistId2: [],
			todolistId1: []
		},
		action
	)

	expect(endState['todolistId1'].length).toBe(3)
	expect(endState['todolistId2'].length).toBe(0)
})

test('status of specified task should be changed', () => {
	const args = {
		taskId: '2',
		domainModel: { status: TaskStatuses.New },
		todolistId: 'todolistId2'
	}
	const action = tasksThunks.updateTask.fulfilled(args, 'requestId', args)

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
	expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
	const args = {
		taskId: '2',
		domainModel: { title: 'yogurt' },
		todolistId: 'todolistId2'
	}
	const action = tasksThunks.updateTask.fulfilled(args, 'requestId', args)

	const endState = tasksReducer(startState, action)

	expect(endState['todolistId1'][1].title).toBe('JS')
	expect(endState['todolistId2'][1].title).toBe('yogurt')
	expect(endState['todolistId2'][0].title).toBe('bread')
})
