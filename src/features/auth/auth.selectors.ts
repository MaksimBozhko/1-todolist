import { AppRootStateType } from '../../app/store'

export const getIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
