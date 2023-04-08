import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearTasksAndTodolists} from '../actions/common.actions';
import {todolistsAPI, TodolistType} from '../api/todolist-api';
import {appActions, RequestStatusType} from './appSlice';
import {createAppAsyncThunk, handleServerNetworkError} from '../utils';
import {tasksActions} from './taskSlice';

//thunks
const fetchTodoLists = createAppAsyncThunk<{ todoLists: TodolistType[] }, undefined>
('todo/fetchTodoLists', async (_, {rejectWithValue, dispatch}) => {
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsAPI.getTodolists()
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        dispatch(tasksActions.addTodoLists({todoLists: res.data}))
        return {todoLists: res.data}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>
('todo/addTodolist', async (title, {rejectWithValue, dispatch}) => {
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsAPI.createTodolist(title)
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        dispatch(tasksActions.addTodoList({todolist: res.data.data.item}))
        return {todolist: res.data.data.item}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const removeTodolist = createAppAsyncThunk
('todo/removeTodolist', async (id: string, {rejectWithValue, dispatch}) => {
    try {
        //изменим глобальный статус приложения, чтобы вверху полоса побежала
        dispatch(appActions.setAppStatus({status: 'loading'}))
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(todolistsActions.changeTodolistEntityStatus({id, entityStatus: 'loading'}))
        await todolistsAPI.deleteTodolist(id)
        //скажем глобально приложению, что асинхронная операция завершена
        dispatch(appActions.setAppStatus({status: 'succeeded'}))
        dispatch(todolistsActions.removeTodolist({id}))
        dispatch(tasksActions.removeTask({id}))

    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const changeTodolistTitle = createAppAsyncThunk<{ id: string, title: string }, { id: string, title: string }>
('todo/changeTodolistTitle', async ({id, title}, {rejectWithValue, dispatch}) => {
    try {
        await todolistsAPI.updateTodolist(id, title)
        return {id, title}
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const initialState: TodolistDomainType[] = []

const slice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        },
        changeTodolistFilter: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.filter = action.payload.filter
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const todo = state.find(todo => todo.id === action.payload.id)
            if (todo) {
                todo.entityStatus = action.payload.entityStatus
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                // @ts-ignore
                state.push(...action.payload.todoLists.map(tl => ({...tl, filter: 'all' , entityStatus: 'idle'})))
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                const newTodolist: TodolistDomainType = {
                    ...action.payload.todolist,
                    filter: 'all',
                    entityStatus: 'idle'
                }
                state.unshift(newTodolist)
            })
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const todo = state.find(todo => todo.id === action.payload.id)
                if (todo) {
                    todo.title = action.payload.title
                }
            })
            .addCase(clearTasksAndTodolists, () => {
                return []
            })
    }
})

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions
export const todolistsThunks = {fetchTodoLists, addTodolist, removeTodolist, changeTodolistTitle}

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}