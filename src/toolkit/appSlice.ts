import {createSlice, PayloadAction} from '@reduxjs/toolkit'

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction<statusType>) => { state.status = action.payload },
        setAppError: (state, action: PayloadAction<string | null>) => { state.error = action.payload },
    },
})

export const {setAppStatus, setAppError} = appSlice.actions
export default appSlice.reducer

//types
export type statusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = {
    status: statusType
    error: string | null
}