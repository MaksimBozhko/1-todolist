import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {todolistApi, TodolistType} from '../api/todolist-api';
import {statusType} from '../reducer/appReducer';
import {setAppError, setAppStatus} from './appSlice';

const initialState: TodolistDomainType[] = [
    // {id: todoList1, title: 'What to learn', filter: "all", addedDate: '', order: 0,},
    // {id: todoList2, title: 'What to buy', filter: "all", addedDate: '', order: 0,},
]

//thunk
export const setTodolistsT = createAsyncThunk('todolist/setTodolistsT',
    async (_, { rejectWithValue, dispatch }) =>  {
        try {
            dispatch(setAppStatus('loading'))
            const response = await todolistApi.getTodolist()
            dispatch(setAppStatus('succeeded'))
            // return response.data
            dispatch(setTodolists(response.data))
        } catch (err: any) {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }
    })
export const addTodolistT = createAsyncThunk('todolist/addTodolistT',
    async (title: string, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatus('loading'))
            const response = await todolistApi.createTodolist(title)
            if (response.data.resultCode === 0) {
                dispatch(addTodolist(response.data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                dispatch(setAppError(response.data.messages[0]))
            }
        } catch (err: any) {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }
    })
export const deleteTodolistT = createAsyncThunk('todolist/deleteTodolistT',
    async (todolistId: string, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatus('loading'))
            const response = await todolistApi.deleteTodolist(todolistId)
            if (response.data.resultCode === 0) {
                dispatch(removeTodolist(todolistId))
                dispatch(setAppStatus('succeeded'))
            } else {
                dispatch(setAppError(response.data.messages[0]))
            }
        } catch (err: any) {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }
    })
export const updateTodolistT = createAsyncThunk('todolist/updateTodolistT',
    async ({todolistId, newTitle}: UpdateTodolistType, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatus('loading'))
            const response = await todolistApi.updateTodolist(todolistId, newTitle)
            if (response.data.resultCode === 0) {
                dispatch(updateTodolist({id:todolistId, newTitle}))
                dispatch(setAppStatus('succeeded'))
            } else {
                dispatch(setAppError(response.data.messages[0]))
            }
        } catch (err: any) {
            dispatch(setAppStatus('failed'))
            dispatch(setAppError(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }
    })

export const todolistSlice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        setTodolists: (state, action: PayloadAction<TodolistType[]>) => {
            return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        addTodolist: (state, action: PayloadAction<TodolistType>) => {
             state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'});
            return state
        },
        removeTodolist: (state, action: PayloadAction<string>) => state.filter(t => t.id !== action.payload),
        updateTodolist: (state, action: PayloadAction<{id: string, newTitle: string}>) => {
            return state.map(t => t.id === action.payload.id ? {...t, title: action.payload.newTitle} : t)
        },
        changeFilter: (state, action: PayloadAction<{id: string, filter: FilterValuesType}>) => {
            return state.map(t => t.id === action.payload.id ? {...t, filter: action.payload.filter} : t)
        },
        changeEntityStatus: (state, action: PayloadAction<{id: string, entityStatus: statusType}>) => {
            return state.map(t => t.id === action.payload.id ? {...t, entityStatus: action.payload.entityStatus} : t)
        },
    },
    extraReducers: {
        [setTodolistsT.pending.type]: (state, action) => {},
        [setTodolistsT.fulfilled.type]: (state, action: PayloadAction<TodolistType[]>) => {
            // action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        [setTodolistsT.rejected.type]: (state, action) => {},
    }
})

export const { setTodolists, addTodolist, removeTodolist, updateTodolist, changeFilter, changeEntityStatus} = todolistSlice.actions
export default todolistSlice.reducer

//types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: statusType
}
//thunk type
type UpdateTodolistType = {todolistId: string, newTitle: string}