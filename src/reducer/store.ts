import {ActionTaskType, tasksReducer} from './tasksReducer';
import {ActionTodoListType, todoListReducer} from './todoListReducer';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkAction} from "redux-thunk";
import {ActionAppType, appReducer} from "./appReducer";

const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todoListReducer,
   app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = ActionTodoListType | ActionTaskType | ActionAppType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store;