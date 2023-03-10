import {tasksApi, TaskStatuses, TaskType, TodoTaskPriorities, UpdateTaskModelType} from "../api/todolist-api";
import {AppActionsType, AppRootStateType, AppThunk} from "./store";
import {setAppErrorAC, setAppStatusAC} from "./appReducer";
import handleServerNetworkError from "../utils/networkError";

export const tasksReducer = (state: TasksStateType = {
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
}, action: AppActionsType) => {
    switch (action.type) {
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case 'REMOVE-TASK':
            return {...state, [action.todoId]: state[action.todoId].filter((t) => t.id !== action.taskId)}
        case "UPDATE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].map((t) => {
                    return t.id === action.taskId ? {...t, ...action.newParam} : t
                })}
        case 'SET-TODOLISTS':
            action.todolists.forEach(tl => state[tl.id] = [])
            return {...state}
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const stateCopy = {...state}
            delete stateCopy[action.id];
            return stateCopy
        default:
            return state;
    }
};

//actions
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task}) as const
export const removeTaskAC = (todoId: string, taskId: string) => ({type: 'REMOVE-TASK', todoId, taskId}) as const
export const updateTaskAC = (todolistId: string, taskId: string, newParam: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todolistId, taskId, newParam} as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks}) as const

//thunks
export const getTasks = (todoId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await tasksApi.getTasks(todoId)
        if (response.data.error == null) {
            dispatch(setTasksAC(todoId, response.data.items))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppErrorAC(response.data.error))
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}
export const addTask = (todoId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await tasksApi.createTask(todoId, title)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(addTaskAC(response.data.data.item))
        } else {
            dispatch(setAppErrorAC(response.data.messages[0]))
        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }

}
export const deleteTask = (todoId: string, taskId: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await tasksApi.deleteTask(todoId, taskId)
        if (response.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
            dispatch(removeTaskAC(todoId, taskId))
        } else {
            dispatch(setAppErrorAC(response.data.messages[0]))
        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}
export const updateTask = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => {
    return async (dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todoId].find(t => t.id === taskId)
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
            const response = await tasksApi.updateTask(todoId, taskId, apiModel)
            response.data.resultCode === 0
                ? dispatch(updateTaskAC(todoId, taskId, apiModel))
                : dispatch(setAppErrorAC(response.data.messages[0]))
        } catch (e: any) {
            dispatch(setAppErrorAC(e.message))
        }
    }
}

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
//actions type
export type ActionTaskType = AddTaskACType | RemoveTaskACType | ChangeTitleACType | SetTasksACType
export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export type ChangeTitleACType = ReturnType<typeof updateTaskAC>;
export type SetTasksACType = ReturnType<typeof setTasksAC>;