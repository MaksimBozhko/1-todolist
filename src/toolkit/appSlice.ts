import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {authApi} from '../api/todolist-api';
import {setIsLoggedInAC} from './authSlice';

const initialState: InitialStateType = {
    isInitialized: false,
    status: 'idle',
    error: null
}

//thunk
export const initializeApp = createAsyncThunk('todolist/initializeApp',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            dispatch(setAppStatusAC('loading'))
            const response = await authApi.authMe()
            if (response.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(true))
            } else {
                dispatch(setAppErrorAC(response.data.messages[0]))
                dispatch(setAppStatusAC('failed'))
            }
            dispatch(setAppInitializedAC(true))
        } catch (err: any) {
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(err.message ? err.message : 'some error occurred'))
            return rejectWithValue(err)
        }

    })

export const appSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setAppInitializedAC: (state, action: PayloadAction<boolean>) => { state.isInitialized = action.payload },
        setAppStatusAC: (state, action: PayloadAction<statusType>) => { state.status = action.payload },
        setAppErrorAC: (state, action: PayloadAction<string | null>) => { state.error = action.payload },
    },
})

export const {setAppStatusAC, setAppInitializedAC, setAppErrorAC} = appSlice.actions
export default appSlice.reducer

//types
export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
    isInitialized: boolean
    status: statusType
    error: string | null
}