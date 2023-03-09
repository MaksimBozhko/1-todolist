import axios from "axios";

type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsError:[]
    data: T
}
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: any
    deadline: any
    id: string
    todoListId: string
    order: number
    addedDate: any
}
type TasksType = {
    error: string
    totalCount: number
    items: TaskType[]
}
type ResponseTasksType = {
    resultCode: number
    messages: Array<string>,
    data: {item: TaskType}
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})

export const todolistApi = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType } >>('todo-lists', {title})
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    updateTodolist(todoId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoId}`, {title})
    }
}

export const tasksApi = {
    getTasks(todoId: string) {
        return instance.get<TasksType>(`todo-lists/${todoId}/tasks`)
    },
    createTasks(todoId: string, title: string) {
        return instance.post<ResponseTasksType>(`todo-lists/${todoId}/tasks`, {title})
    },
    deleteTasks(todoId: string, taskId: string) {
        return instance.delete<ResponseTasksType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTasks(todoId: string, taskId: string, title: string) {
        return instance.put<ResponseTasksType>(`todo-lists/${todoId}/tasks/${taskId}`, {title})
    }
}