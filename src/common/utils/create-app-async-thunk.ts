import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, AppRootStateType} from '../toolkit/store';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatch
    rejectValue: unknown
}>()