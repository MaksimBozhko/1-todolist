import axios from 'axios'
import { ResponseType, TodolistType } from '../../../common/types/common.types'

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: { 'API-KEY': '1cdd9f77-c60e-4af5-b194-659e4ebd5d41' }
})

// api
export const todolistsAPI = {
	getTodolists() {
		return instance.get<TodolistType[]>('todo-lists')
	},
	createTodolist(title: string) {
		return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {
			title: title
		})
	},
	deleteTodolist(id: string) {
		return instance.delete<ResponseType>(`todo-lists/${id}`)
	},
	updateTodolist(id: string, title: string) {
		return instance.put<ResponseType>(`todo-lists/${id}`, { title: title })
	}
}
