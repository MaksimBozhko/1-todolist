import {taskId, TasksStateType} from './tasksReducer';
import {TaskStatuses, TodoTaskPriorities} from "../api/todolist-api";
import {todoList1} from "./todoListReducer";

let startState: TasksStateType

beforeEach(() => {
   startState = {
   ['todolistId1']: [
       {id: '1', title: 'HTML', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low},
     {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
       startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low},
     {id: '3', title: 'REACT', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
       startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low},
     {id: '4', title: 'HTML', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
       startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low},
       {id: taskId, title: 'HTML', status: TaskStatuses.Completed, todoListId: todoList1, description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low},
   ],
   ['todolistId2']: [
     {id: '1', title: 'bread', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
       startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low},
     {id: '2', title: 'butter', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
       startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low},
     {id: '3', title: 'meat', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
       startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low},
   ],
   };
})

// test('correct task should be added to correct array', () => {
//
//
//   const action = addTaskAC('todolistId2', 'juce');
//
//   const endState = tasksReducer(startState, action);
//
//   expect(endState['todolistId1'].length).toBe(4);
//   expect(endState['todolistId2'].length).toBe(4);
//   expect(endState['todolistId2'][0].id).toBeDefined();
//   expect(endState['todolistId2'][0].title).toBe('juce');
//   expect(endState['todolistId2'][0].completed).toBe(false);
// });
//
// test('status of specified task should be changed', () => {
//
//
//   const action = changeStatusAC('todolistId2', '2', false);
//
//   const endState = tasksReducer(startState, action);
//
//   expect(endState['todolistId2'][1].completed).toBe(false);
//   expect(endState['todolistId2'].length).toBe(3);
// });

// test('title of specified task should be changed', () => {
//
//   const action = changeTitleAC('todolistId1', '3', 'bread');
//
//   const endState = tasksReducer(startState, action);
//
//   expect(endState['todolistId1'][2].title).toBe('bread');
//   expect(endState['todolistId2'][2].title).toBe('tea');
//   expect(endState['todolistId2'].length).toBe(4);
// });
