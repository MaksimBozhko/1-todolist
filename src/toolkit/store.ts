import {combineReducers, configureStore} from '@reduxjs/toolkit'
import todolistSlice from './todolistSlice';
import taskSlice from './taskSlice';
import appSlice from './appSlice';

const reducer = combineReducers({
    todolist: todolistSlice,
    task: taskSlice,
    app: appSlice
})
export const store2 = configureStore({reducer})

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store2.dispatch

// @ts-ignore
window.store2 = store2;