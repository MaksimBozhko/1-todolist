import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {todolistApi, TodolistType} from '../api/todolist-api';
import {statusType} from '../reducer/appReducer';
import {setAppErrorAC, setAppStatusAC} from './appSlice';
import {addEmptyTasksAC, removeTasksAC, setEmptyTasks} from './taskSlice';

const initialState: TodolistDomainType[] = [
    // {id: todoList1, title: 'What to learn', filter: "all", addedDate: '', order: 0,},
    // {id: todoList2, title: 'What to buy', filter: "all", addedDate: '', order: 0,},
]

//thunk
export const setTodolists = createAsyncThunk('todolist/setTodolists',
    async (_, { rejectWithValue, dispatch }) =>  {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = await todolistApi.getTodolist()
            dispatch(setAppStatusAC('succeeded'))
            dispatch(setEmptyTasks(response.data))
            dispatch(setTodolistsAC(response.data))
        } catch (err: any) {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }
    })
export const addTodolist = createAsyncThunk('todolist/addTodolist',
    async (title: string, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = await todolistApi.createTodolist(title)
            if (response.data.resultCode === 0) {
                dispatch(addTodolistAC(response.data.data.item))
                dispatch(addEmptyTasksAC(response.data.data.item.id))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC(response.data.messages[0]))
            }
        } catch (err: any) {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }
    })
export const deleteTodolist = createAsyncThunk('todolist/deleteTodolist',
    async (todolistId: string, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = await todolistApi.deleteTodolist(todolistId)
            if (response.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(removeTasksAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC(response.data.messages[0]))
            }
        } catch (err: any) {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }
    })
export const updateTodolist = createAsyncThunk('todolist/updateTodolist',
    async ({todolistId, newTitle}: UpdateTodolistType, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = await todolistApi.updateTodolist(todolistId, newTitle)
            if (response.data.resultCode === 0) {
                dispatch(updateTodolistAC({id:todolistId, newTitle}))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC(response.data.messages[0]))
            }
        } catch (err: any) {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }
    })

export const todolistSlice = createSlice({
    name: 'todolist',
    initialState,
    reducers: {
        setTodolistsAC: (state, action: PayloadAction<TodolistType[]>) => {
            return action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        addTodolistAC: (state, action: PayloadAction<TodolistType>) => {
             state.unshift({...action.payload, filter: 'all', entityStatus: 'idle'});
            return state
        },
        removeTodolistAC: (state, action: PayloadAction<string>) => state.filter(t => t.id !== action.payload),
        updateTodolistAC: (state, action: PayloadAction<{id: string, newTitle: string}>) => {
            return state.map(t => t.id === action.payload.id ? {...t, title: action.payload.newTitle} : t)
        },
        changeFilterAC: (state, action: PayloadAction<{id: string, filter: FilterValuesType}>) => {
            return state.map(t => t.id === action.payload.id ? {...t, filter: action.payload.filter} : t)
        },
        changeEntityStatusAC: (state, action: PayloadAction<{id: string, entityStatus: statusType}>) => {
            return state.map(t => t.id === action.payload.id ? {...t, entityStatus: action.payload.entityStatus} : t)
        },
    },
    extraReducers: {
        [setTodolists.pending.type]: (state, action) => {},
        [setTodolists.fulfilled.type]: (state, action: PayloadAction<TodolistType[]>) => {
            // action.payload.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        [setTodolists.rejected.type]: (state, action) => {},
    }
})

export const { setTodolistsAC, addTodolistAC, removeTodolistAC, changeFilterAC, changeEntityStatusAC, updateTodolistAC} = todolistSlice.actions
export default todolistSlice.reducer

//types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: statusType
}
//thunk type
type UpdateTodolistType = {todolistId: string, newTitle: string}