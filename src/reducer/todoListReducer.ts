import {todolistApi, TodolistType} from "../api/todolist-api";
import {AppActionsType, AppThunk} from "./store";
import {setAppErrorAC, setAppStatusAC, statusType} from "./appReducer";
import handleServerNetworkError from "../utils/networkError";

export const todoListReducer = (state: TodolistDomainType[] = [
    // {id: todoList1, title: 'What to learn', filter: "all", addedDate: '', order: 0,},
    // {id: todoList2, title: 'What to buy', filter: "all", addedDate: '', order: 0,},
], action: AppActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "idle"} , ...state];
        case 'REMOVE-TODOLIST':
            return state.filter((t) => t.id !== action.id);
        case 'UPDATE-TODOLIST':
            return state.map((t) => t.id === action.id ? {...t, title: action.newTitle} : t)
        case 'CHANGE-FILTER':
            return state.map((t) => t.id === action.id ? {...t, filter: action.filter} : t)
        case "CHANGE-ENTITY-STATUS":
            return state.map((t) => t.id === action.id ? {...t, entityStatus: action.entityStatus} : t)
        case 'SET-TODOLISTS':
            return action.todolists.map((tl) => ({...tl, filter: 'all', entityStatus: "idle"}))
        default:
            return state;
    }
};

//actions
export const addTodoListAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist}) as const
export const removeTodoListAC = (id: string) => ({type: 'REMOVE-TODOLIST', id: id}) as const
export const updateTodoListAC = (id: string, newTitle: string) => ({type: 'UPDATE-TODOLIST', id, newTitle}) as const
export const changeFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-FILTER', id, filter}) as const
export const changeEntityStatusAC = (id: string, entityStatus: statusType) => ({type: 'CHANGE-ENTITY-STATUS', id, entityStatus}) as const
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists}) as const

//thunks
export const setTodolists = (): AppThunk => async (dispatch)=> {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await todolistApi.getTodolist()
        dispatch(setAppStatusAC('succeeded'))
        dispatch(setTodolistsAC(response.data))
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}
export const addTodoList = (title: string): AppThunk => async (dispatch)=> {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await todolistApi.createTodolist(title)
        if (response.data.resultCode === 0) {
            dispatch(addTodoListAC(response.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppErrorAC(response.data.messages[0]))
        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}
export const deleteTodoList = (todolistId: string): AppThunk => async (dispatch)=> {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await todolistApi.deleteTodolist(todolistId)
        if (response.data.resultCode === 0) {
            dispatch(removeTodoListAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppErrorAC(response.data.messages[0]))
        }
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}
export const updateTodoList = (todolistId: string, newTitle: string): AppThunk => async (dispatch)=> {
    try {
        dispatch(setAppStatusAC('loading'))
        const response = await todolistApi.updateTodolist(todolistId, newTitle)
        if (response.data.resultCode === 0) {
            dispatch(updateTodoListAC(todolistId, newTitle))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setAppErrorAC(response.data.messages[0]))
        }
        response.data.resultCode === 0 && dispatch(updateTodoListAC(todolistId, newTitle))
    } catch (e: any) {
        handleServerNetworkError(e.message, dispatch)
    }
}

//types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: statusType
}
//actions type
export type ActionTodoListType = RemoveTodoListACType | AddTodoListACType | UpdateTodoListACType | ChangeFilterACType | setTodolistsACType | changeEntityStatusACType
export type AddTodoListACType = ReturnType<typeof addTodoListAC>;
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
export type UpdateTodoListACType = ReturnType<typeof updateTodoListAC>;
export type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export type changeEntityStatusACType = ReturnType<typeof changeEntityStatusAC>
