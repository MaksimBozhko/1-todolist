import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {tasksApi, TaskStatuses, TaskType, TodolistType, TodoTaskPriorities, UpdateTaskModelType
} from '../api/todolist-api';
import {setAppErrorAC, setAppStatusAC} from './appSlice';

const initialState: TasksStateType = {
    // [todoList1]: [
    //     {id: taskId, title: 'HTML', status: TaskStatuses.Completed, todoListId: todoList1, description: '',
    //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TodoTaskPriorities.Low, completed: false}
    // ],
    // [todoList2]: [
    //     {taskId: v1(), title: 'bread', isDone: true},
    //     {taskId: v1(), title: 'butter', isDone: true},
    //     {taskId: v1(), title: 'meat', isDone: true},
    //     {taskId: v1(), title: 'milk', isDone: false},
    // ],
}

export const getTasks = createAsyncThunk('todolist/getTasks',
    async (todolistId: string, { rejectWithValue, dispatch }) =>  {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = await tasksApi.getTasks(todolistId)
            let tasks = response.data.items
            if (response.data.error == null) {
                dispatch(setTasksAC({todolistId, tasks}))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC(response.data.error))
                dispatch(setAppStatusAC('failed'))
            }
        } catch (err: any) {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }
    })
export const addTask = createAsyncThunk('todolist/addTask',
    async ({todoId, title}: AddTaskType, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = await tasksApi.createTask(todoId, title)
            if (response.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(addTaskAC(response.data.data.item))
            } else {
                dispatch(setAppErrorAC(response.data.messages[0]))
            }
        } catch (err: any) {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }
    })
export const deleteTask = createAsyncThunk('todolist/deleteTask',
    async ({todoId, taskId}: DeleteTaskType, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = await tasksApi.deleteTask(todoId, taskId)
            if (response.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(removeTaskAC({todoId, taskId}))
            } else {
                dispatch(setAppErrorAC(response.data.messages[0]))
            }
        } catch (err: any) {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }
    })
export const updateTask = createAsyncThunk('todolist/updateTask',
    async ({todolistId, taskId, domainModel}: UpdateTaskType, { rejectWithValue, dispatch, getState }) => {
        const state: any = getState()
        const task = state.task[todolistId].find((t: TaskType) => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
    try {
        const response = await tasksApi.updateTask(todolistId, taskId, apiModel)
        response.data.resultCode === 0
            ? dispatch(updateTaskAC({todolistId, taskId, apiModel}))
            : dispatch(setAppErrorAC(response.data.messages[0]))
        } catch (err: any) {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }
    })

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasksAC: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
             state[action.payload.todolistId] = action.payload.tasks
            return state
        },
        addTaskAC: (state, action: PayloadAction<TaskType>) => {
            state[action.payload.todoListId] = [action.payload, ...state[action.payload.todoListId]]
        },
        removeTaskAC: (state, action: PayloadAction<{todoId: string, taskId: string}>) => {
            state[action.payload.todoId] = state[action.payload.todoId].filter((t) => t.id !== action.payload.taskId)
        },
        updateTaskAC: (state, action: PayloadAction<{todolistId: string, taskId: string, apiModel: UpdateDomainTaskModelType}>) => {
            state[action.payload.todolistId] = state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? {...t, ...action.payload.apiModel} : t)
        },
        setEmptyTasks: (state, action: PayloadAction<TodolistType[]>) => {
            action.payload.forEach(tl => state[tl.id] = [])
        },
        addEmptyTasksAC: (state, action: PayloadAction<string>) => {
            state[action.payload] = []
        },
        removeTasksAC: (state, action: PayloadAction<string>) => {
            delete state[action.payload];
        },
    },
})

export const {setTasksAC, addTaskAC, removeTaskAC, updateTaskAC, setEmptyTasks, addEmptyTasksAC, removeTasksAC} = taskSlice.actions
export default taskSlice.reducer

//types
export type TasksStateType = {
    [key: string]: TaskType[]
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
}
//thunk type
type AddTaskType = { todoId: string, title: string }
type DeleteTaskType = { todoId: string, taskId: string }
type UpdateTaskType = { todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType }