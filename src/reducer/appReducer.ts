import {AppActionsType} from './store';

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state = initialState, action: AppActionsType) => {
    switch (action.type) {
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

//thunks
export type ActionAppType = setStatusACType | setErrorACType
export type setStatusACType = ReturnType<typeof setAppStatusAC>;
export type setErrorACType = ReturnType<typeof setAppErrorAC>;

//types
export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
    status: statusType
    error: string | null
}