import {authApi} from '../api/todolist-api';
import {AppThunk} from './store';
import {setAppErrorAC, setAppStatusAC} from './appReducer';
import handleServerNetworkError from '../utils/networkError';

const initialState = {
    isLoggedIn: false,
    userId: 0,
    email: '',
    password: '',
    rememberMe: false,
    captcha: ''
}

export const authReducer = (state: InitialStateType = initialState, action: ActionLoginType): InitialStateType => {
    switch (action.type) {
        case 'SET-AUTH-DATA':
            return {...state, ...action.payload}
        case 'SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state;
    }
};

//actions
export const setAuthData = (data: SetDataType) => ({
    type: 'SET-AUTH-DATA',
    payload: data
}) as const
export const setIsLoggedIn = (value: boolean) => ({type: 'SET-IS-LOGGED-IN', value}) as const

//thunks
export const login = (data: SetDataType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await authApi.login(data)
        if (response.data.resultCode === 0) {
            let userId: number = 0
            response.data.data.userId  && ( userId =  response.data.data.userId)
            dispatch(setAuthData({...data, userId}))
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppErrorAC(response.data.messages[0]))
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}

export const logout = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await authApi.logout()
        if (response.data.resultCode === 0) {
            dispatch(setIsLoggedIn(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppErrorAC(response.data.messages[0]))
            dispatch(setAppStatusAC('failed'))
        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}


//types
type InitialStateType = typeof initialState
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type SetDataType = LoginParamsType & {userId?: number}
//actions type
export type ActionLoginType = setAuthDataType | setIsLoggedInType
export type setAuthDataType = ReturnType<typeof setAuthData>;
export type setIsLoggedInType = ReturnType<typeof setIsLoggedIn>;

