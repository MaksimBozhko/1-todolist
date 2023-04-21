import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authActions } from '../features/auth/authSlice'
import { createAppAsyncThunk, handleServerNetworkError } from '../common/utils'
import { authAPI } from '../features/auth'

const initialState = {
	status: 'idle' as RequestStatusType,
	error: null as string | null,
	isInitialized: false
}

//thunks
const initializeApp = createAppAsyncThunk('app/initializeApp', async (_, { rejectWithValue, dispatch }) => {
	try {
		const res = await authAPI.me()
		if (res.data.resultCode === 0) {
			dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
		}
	} catch (e) {
		handleServerNetworkError(e, dispatch)
		return rejectWithValue(null)
	}
})

const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
			state.error = action.payload.error
		},
		setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
			state.status = action.payload.status
		}
	},
	extraReducers: builder => {
		builder.addCase(initializeApp.fulfilled, state => {
			state.isInitialized = true
		})
	}
})

export const appSlice = slice.reducer
export const appActions = slice.actions
export const appThunks = { initializeApp }

//types
export type AppInitialStateType = typeof initialState
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
