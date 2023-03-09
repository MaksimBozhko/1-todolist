import {v1} from 'uuid';
import {
  changeFilterAC, FilterValuesType,
  removeTodoListAC, setTodolistsAC, TodolistDomainType,
  todoListReducer,
  updateTodoListAC,
} from './todoListReducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: 'What to learn', filter: "all", addedDate: '', order: 0,},
        {id: todolistId2, title: 'What to buy', filter: "all", addedDate: '', order: 0,},
    ];
});

test('correct todolist should be removed', () => {
    const endState = todoListReducer(startState, removeTodoListAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle,
    };

    const endState = todoListReducer(startState, updateTodoListAC(action.id, action.title));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';

    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter,
    };

    const endState = todoListReducer(startState, changeFilterAC(action.id, action.filter));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be set', () => {
  const todolistId3 = v1();
  const todolistId4 = v1();
  const todolists = [
    {id: todolistId3, title: 'What to want', filter: "all", addedDate: '', order: 0,},
    {id: todolistId4, title: 'What to read', filter: "all", addedDate: '', order: 0,},
  ];
  const action = {
    type: 'SET-TODOLISTS',
    todolists
  };

  const endState = todoListReducer(startState, setTodolistsAC(action.todolists));

  expect(endState[2].title).toBe('What to want');
  expect(endState[3].title).toBe('What to read');
});
