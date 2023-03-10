import React from 'react';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {tasksReducer} from "../reducer/tasksReducer";
import {todoListReducer} from "../reducer/todoListReducer";
import {appReducer} from "../reducer/appReducer";
import thunk from "redux-thunk";
import {TaskStatuses, TodoTaskPriorities} from "../api/todolist-api";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer,
    app: appReducer
})

export const taskId = v1()
export const taskId2 = v1()
export const taskId3 = v1()
export const todoList1 = v1();
export const todoList2 = v1();

const initialGlobalState = {
    todolists: [
        {id: todoList1, title: 'What to learn', filter: "all", addedDate: '', order: 0, entityStatus: "loading"},
        {id: todoList2, title: 'What to buy', filter: "all", addedDate: '', order: 0 , entityStatus: "idle"},
    ],
    tasks: {
        [todoList1]: [
            {id: taskId, title: 'HTML', status: TaskStatuses.Completed, todoListId: todoList1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, completed: false}
        ],
        [todoList2]: [
            {id: taskId2, title: 'bread', status: TaskStatuses.Completed, todoListId: todoList1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, completed: false},
            {id: taskId3, title: 'butter', status: TaskStatuses.Completed, todoListId: todoList1, description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, completed: false},
        ],
    },
    app: {
        status: 'idle',
        error: null
    }
}
export const storyBookStore = createStore(rootReducer, initialGlobalState as any, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}