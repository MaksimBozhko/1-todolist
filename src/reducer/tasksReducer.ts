import {v1} from 'uuid';
import {tasksApi, TaskStatuses, TaskType, TodoTaskPriorities, UpdateTaskModelType} from "../api/todolist-api";
import {ThunkAction} from "redux-thunk";
import {AppActionsType, AppRootStateType, AppThunk} from "./store";
import {AnyAction} from "redux";


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
            const {todoListId} = action.payload.task
            return {...state, [todoListId]: [action.payload.task, ...state[todoListId]]};
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter((t) => t.id !== action.payload.taskId,),
            };
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.payload.id]: state[action.payload.id].map((t) =>
                    t.id === action.payload.taskId ? {...t, completed: action.payload.completed} : t,
                ),
            };
        }
        case 'CHANGE-TITLE': {
            return {
                ...state,
                [action.payload.id]: state[action.payload.id].map((t) =>
                    t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t,
                ),
            };
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.todolist.id]: [] as TaskType[],
            };
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.id];
            return stateCopy;
            // let {
            //     [action.payload.id]: [],
            //     ...rest
            // } = {...state};
            // return rest;
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.payload.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS': {
            let copyState = {...state}
            copyState[action.payload.todolistId] = action.payload.tasks
            return copyState
        }
        default:
            return state;
    }
};

export type ActionTaskType = AddTaskACType | RemoveTaskACType | ChangeStatusACType | ChangeTitleACType | SetTasksACType
export type AddTaskACType = ReturnType<typeof addTaskAC>;
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>;
export type ChangeStatusACType = ReturnType<typeof changeStatusAC>;
export type ChangeTitleACType = ReturnType<typeof changeTitleAC>;
export type SetTasksACType = ReturnType<typeof setTasksAC>;

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', payload: {task}}) as const;
export const removeTaskAC = (todoId: string, taskId: string) => ({
    type: 'REMOVE-TASK',
    payload: {todoId, taskId: taskId,}
}) as const;
export const changeStatusAC = (id: string, taskId: string, completed: boolean) => {
    return {type: 'CHANGE-STATUS', payload: {id: id, taskId: taskId, completed}} as const;
};
export const changeTitleAC = (id: string, taskId: string, newTitle: string) => ({
    type: 'CHANGE-TITLE',
    payload: {id: id, taskId: taskId, newTitle: newTitle,}
}) as const;
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS',
    payload: {todolistId, tasks}
}) as const;

export const setTasks = (todoId: string): AppThunk => async (dispatch) => {
    const response = await tasksApi.getTasks(todoId)
    dispatch(setTasksAC(todoId, response.data.items))
}
export const addTask = (todoId: string, title: string): AppThunk => async (dispatch) => {
    const response = await tasksApi.createTasks(todoId, title)
    response.data.resultCode === 0 && dispatch(addTaskAC(response.data.data.item))
}
export const deleteTask = (todoId: string, taskId: string): AppThunk => async (dispatch) => {
    const response = await tasksApi.deleteTasks(todoId, taskId)
    response.data.resultCode === 0 && dispatch(removeTaskAC(todoId, taskId))
}
export const changeTaskTitle = (todoId: string, taskId: string, newTitle: string): AppThunk => async (dispatch) => {
    const response = await tasksApi.updateTasks(todoId, taskId, newTitle)
    response.data.resultCode === 0 && dispatch(changeTitleAC(todoId, taskId, newTitle))
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTask = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType): ThunkAction<Promise<void>, AppRootStateType, unknown, AnyAction> => {
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
        // const response = await tasksApi.updateTasks(todoId, taskId, newTitle)
        // response.data.resultCode === 0 && dispatch(changeTitleAC(todoId, taskId, newTitle))
    }
}