import { AppRootStateType } from './store'

export const getIsInitialized = (state: AppRootStateType) => state.app.isInitialized
export const getError = (state: AppRootStateType) => state.app.error
