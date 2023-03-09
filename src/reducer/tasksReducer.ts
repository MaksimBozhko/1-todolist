import {v1} from 'uuid';
import {tasksApi, TaskStatuses, TaskType, TodoTaskPriorities, UpdateTaskModelType} from "../api/todolist-api";
import {AppActionsType, AppRootStateType, AppThunk} from "./store";

export type TasksStateType = {
    [key: string]: TaskType[]
}
export const taskId = v1()
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
};


export const tasksReducer = (state: TasksStateType = initialState, action: AppActionsType) => {
    switch (action.type) {
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todoId]: state[action.todoId].filter((t) => t.id !== action.taskId)}
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map((t) => {
                    return  t.id === action.taskId ? {...t, ...action.newParam} : t
                })
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.id];
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            action.todolists.forEach(tl => state[tl.id] = [])
            return {...state}
        }
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state;
    }
};

export type ActionTaskType = AddTaskACType | RemoveTaskACType | ChangeTitleACType | SetTasksACType
export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export type ChangeTitleACType = ReturnType<typeof updateTaskAC>;
export type SetTasksACType = ReturnType<typeof setTasksAC>;

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task}) as const
export const removeTaskAC = (todoId: string, taskId: string) => ({type: 'REMOVE-TASK', todoId, taskId: taskId}) as const
export const updateTaskAC = (todolistId: string, taskId: string, newParam: UpdateDomainTaskModelType) => {
    return{type: 'UPDATE-TASK', todolistId, taskId, newParam} as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({type: 'SET-TASKS', todolistId, tasks}) as const

export const getTasks = (todoId: string): AppThunk => async (dispatch) => {
    const response = await tasksApi.getTasks(todoId)
    dispatch(setTasksAC(todoId, response.data.items))
}
export const addTask = (todoId: string, title: string): AppThunk => async (dispatch) => {
    const response = await tasksApi.createTask(todoId, title)
    response.data.resultCode === 0 && dispatch(addTaskAC(response.data.data.item))
}
export const deleteTask = (todoId: string, taskId: string): AppThunk => async (dispatch) => {
    const response = await tasksApi.deleteTask(todoId, taskId)
    response.data.resultCode === 0 && dispatch(removeTaskAC(todoId, taskId))
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
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
        const response = await tasksApi.updateTask(todoId, taskId, apiModel)
        response.data.resultCode === 0 && dispatch(updateTaskAC(todoId, taskId, apiModel))
    }
}