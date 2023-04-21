import { UpdateDomainTaskModelType } from '../../features/todolists-list/tasks/taskSlice'

export type LoginParamsType = {
	email: string
	password: string
	rememberMe: boolean
	captcha?: string
}
// types
export type TodolistType = {
	id: string
	title: string
	addedDate: string
	order: number
}
export type ResponseType<D = {}> = {
	resultCode: number
	messages: Array<string>
	data: D
}

export enum TaskStatuses {
	New = 0,
	InProgress = 1,
	Completed = 2,
	Draft = 3
}

export enum TaskPriorities {
	Low = 0,
	Middle = 1,
	Hi = 2,
	Urgently = 3,
	Later = 4
}

export const ResultCode = {
	Success: 0,
	Error: 1,
	Captcha: 10
} as const

export type TaskType = {
	description: string
	title: string
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}
export type UpdateTaskModelType = {
	title: string
	description: string
	status: TaskStatuses
	priority: TaskPriorities
	startDate: string
	deadline: string
}
export type GetTasksResponse = {
	error: string | null
	totalCount: number
	items: TaskType[]
}

export type updateTaskArgType = {
	taskId: string
	domainModel: UpdateDomainTaskModelType
	todolistId: string
}
