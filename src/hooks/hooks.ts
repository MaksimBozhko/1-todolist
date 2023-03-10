import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppActionsType, AppRootStateType} from "../reducer/store";
import {ThunkDispatch} from "redux-thunk";

export type IAppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export const useAppDispatch = () => useDispatch<IAppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector