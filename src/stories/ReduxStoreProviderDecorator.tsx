import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore as createStore} from "redux";
import {taskId, tasksReducer} from "../reducer/tasksReducer";
import {todoList1, todoList2, todoListReducer} from "../reducer/todoListReducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})
const initialGlobalState = {
    todolists: [
        {id: todoList1, title: 'What to learn', filter: 'active'},
        {id: todoList2, title: 'What To buy', filter: 'completed'},
    ],
    tasks: {
        [todoList1]: [
            {taskId: taskId, title: 'HTML', completed: true},
            {taskId: v1(), title: 'css', completed: true},
            {taskId: v1(), title: 'js', completed: true},
            {taskId: v1(), title: 'React', completed: false},
        ],
        [todoList2]: [
            {taskId: v1(), title: 'bread', completed: true},
            {taskId: v1(), title: 'butter', completed: true},
            {taskId: v1(), title: 'meat', completed: true},
            {taskId: v1(), title: 'milk', completed: false},
        ],
    }
}
export const storyBookStore = createStore(rootReducer, initialGlobalState as any);

export const ReduxStoreProviderDecorator = (story: any) => {
    return <Provider store={storyBookStore}>{story()}</Provider>
}