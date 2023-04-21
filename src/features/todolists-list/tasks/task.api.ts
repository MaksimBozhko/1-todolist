import {
	GetTasksResponse,
	ResponseType,
	TaskType,
	UpdateTaskModelType
} from '../../../common/types/common.types'
import { instance } from '../todolists/todolist.api'

export const tasksAPI = {
	getTasks(todolistId: string) {
		return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
	},
	deleteTask(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(
			`todo-lists/${todolistId}/tasks/${taskId}`
		)
	},
	createTask(todolistId: string, taskTitile: string) {
		return instance.post<ResponseType<{ item: TaskType }>>(
			`todo-lists/${todolistId}/tasks`,
			{ title: taskTitile }
		)
	},
	updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
		return instance.put<ResponseType<TaskType>>(
			`todo-lists/${todolistId}/tasks/${taskId}`,
			model
		)
	}
}
