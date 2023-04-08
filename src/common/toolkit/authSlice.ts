import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authAPI, LoginParamsType} from '../api/todolist-api';
import {appActions} from './appSlice';
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from '../utils';
import {clearTasksAndTodolists} from '../actions/common.actions';

//thunks
const login = createAppAsyncThunk<undefined, LoginParamsType>
('auth/login', async (data, {rejectWithValue, dispatch}) => {
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: true}))
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const logout = createAppAsyncThunk
('auth/logout', async (_, {rejectWithValue, dispatch}) => {
    try {
        dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({isLoggedIn: false}))
            dispatch(clearTasksAndTodolists())
            dispatch(appActions.setAppStatus({status: 'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {login, logout}