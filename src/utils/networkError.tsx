import React from 'react';
import {setAppErrorAC, setAppStatusAC} from "../reducer/appReducer";
import {IAppDispatch} from "../hooks/hooks";

const handleServerNetworkError = (message: string, dispatch: IAppDispatch) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(message ? message : 'some error occurred'))
};

export default handleServerNetworkError;