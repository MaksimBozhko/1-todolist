import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authApi} from '../api/todolist-api';
import {setAppErrorAC, setAppStatusAC} from './appSlice';

const initialState: InitialStateType = {
    isLoggedIn: false,
    userId: 0,
    email: '',
    password: '',
    rememberMe: false,
    captcha: ''
}

//thunk
export const login = createAsyncThunk('todolist/login',
    async (data: SetDataType, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = await authApi.login(data)
            if (response.data.resultCode === 0) {
                let userId: number = 0
                response.data.data.userId && (userId = response.data.data.userId)
                dispatch(setAuthDataAC({...data, userId}))
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            }
        }catch (e: any) {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(e.message ? e.message : 'some error occurred'))
        }

    })

export const logout = createAsyncThunk('todolist/logout',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = await authApi.logout()
            if (response.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                dispatch(setAppErrorAC(response.data.messages[0]))
                dispatch(setAppStatusAC('failed'))
            }
        } catch (e: any) {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(e.message ? e.message : 'some error occurred'))
        }

    })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthDataAC: (state, action: PayloadAction<SetDataType>) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.rememberMe = action.payload.rememberMe;
            state.captcha = action.payload.captcha || '';
            state.userId = action.payload.userId || 0;
            state.isLoggedIn = true;
        },
        setIsLoggedInAC: (state, action: PayloadAction<boolean>) => { state.isLoggedIn = action.payload },
    },
})

export const {setIsLoggedInAC , setAuthDataAC} = authSlice.actions
export default authSlice.reducer

//types
type InitialStateType = {
    isLoggedIn: boolean
    userId: number
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
type SetDataType = LoginParamsType & {userId?: number}