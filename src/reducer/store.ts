import {ActionTaskType, tasksReducer} from './tasksReducer';
import {ActionTodoListType, todoListReducer} from './todoListReducer';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todoListReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware<IAppDispatch, any>(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
type IAppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppActionsType = ActionTodoListType | ActionTaskType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store;