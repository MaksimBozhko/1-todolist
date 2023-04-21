import { instance } from '../todolists-list/todolists/todolist.api'
import { LoginParamsType, ResponseType } from '../../common/types/common.types'

export const authAPI = {
	login(data: LoginParamsType) {
		return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
	},
	logout() {
		return instance.delete<ResponseType<{ userId?: number }>>('auth/login')
	},
	me() {
		return instance.get<
			ResponseType<{ id: number; email: string; login: string }>
		>('auth/me')
	}
}
