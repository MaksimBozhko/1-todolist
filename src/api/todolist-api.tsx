import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})

//todolist API
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
//task API
export const tasksApi = {
    getTasks(todoId: string) {
        return instance.get<TasksType>(`todo-lists/${todoId}/tasks`)
    },
    createTask(todoId: string, title: string) {
        return instance.post<ResponseTasksType>(`todo-lists/${todoId}/tasks`, {title})
    },
    deleteTask(todoId: string, taskId: string) {
        return instance.delete<ResponseTasksType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    updateTask(todoId: string, taskId: string, updateObj: UpdateTaskModelType) {
        return instance.put<ResponseTasksType>(`todo-lists/${todoId}/tasks/${taskId}`, {...updateObj})
    }
}

//types
//todolist types
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
//task types
export type TaskType = {
    description: string
    title: string
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