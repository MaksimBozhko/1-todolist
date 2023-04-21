import { AnyAction, combineReducers } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { todolistsSlice } from '../features/todolists-list/todolists'
import { authSlice } from '../features/auth'
import { tasksSlice } from '../features/todolists-list/tasks'
import { appSlice } from './appSlice'

const rootReducer = combineReducers({
	tasks: tasksSlice,
	todolists: todolistsSlice,
	app: appSlice,
	auth: authSlice
})

export const store = configureStore({
	reducer: rootReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// @ts-ignore
window.store = store
