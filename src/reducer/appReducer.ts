import {AppActionsType, AppThunk} from './store';
import {authApi} from '../api/todolist-api';
import handleServerNetworkError from '../utils/networkError';

const initialState = {
    isInitialized: false,
    status: 'idle',
    error: null
}

export const appReducer = (state:InitialStateType = initialState, action: AppActionsType) => {
    switch (action.type) {
        case 'SET-APP-INITIALIZED':
            return {...state, isInitialized: action.value}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

//actions
export const setAppStatusAC = (status: statusType) => ({type: 'APP/SET-STATUS', status}) as const
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error}) as const
export const setAppInitializedAC = (value: boolean) => ({type: 'SET-APP-INITIALIZED', value}) as const

//thunks
export const initializeApp = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await authApi.authMe()
        console.log(response);
        if (response.data.resultCode === 0) {
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppErrorAC(response.data.messages[0]))
            dispatch(setAppStatusAC('failed'))
        }
        dispatch(setAppInitializedAC(true))
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}

//types
export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof  initialState

export type ActionAppType = setStatusACType | setErrorACType | setAppInitializedACType
export type setStatusACType = ReturnType<typeof setAppStatusAC>;
export type setErrorACType = ReturnType<typeof setAppErrorAC>;
export type setAppInitializedACType = ReturnType<typeof setAppInitializedAC>;