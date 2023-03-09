import {v1} from 'uuid';
import {todolistApi, TodolistType} from "../api/todolist-api";
import {AppActionsType, AppThunk} from "./store";

export const todoList1 = v1();
export const todoList2 = v1();

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: TodolistDomainType[] = [
     // {id: todoList1, title: 'What to learn', filter: "all", addedDate: '', order: 0,},
     // {id: todoList2, title: 'What to buy', filter: "all", addedDate: '', order: 0,},
];

export const todoListReducer = (state: TodolistDomainType[] = initialState, action: AppActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.payload.todolist, filter: 'all'}
            return [newTodolist , ...state];
        }
        case 'REMOVE-TODOLIST': {
            return state.filter((t) => t.id !== action.payload.id);
        }
        case 'UPDATE-TODOLIST': {
            return state.map((t) =>
                t.id === action.payload.id ? {...t, title: action.payload.newTitle} : t,
            );
        }
        case 'CHANGE-FILTER': {
            return state.map((t) =>
                t.id === action.payload.id ? {...t, filter: action.payload.filter} : t,
            );
        }
        case 'SET-TODOLISTS': {
            let copyState = [...state]
            const newTodo = action.payload.todolists.map((tl) => ({
                ...tl,
                filter: 'all' as FilterValuesType
                })
            )
            return [...copyState, ...newTodo]
        }
        default:
            return state;
    }
};

export type ActionTodoListType = RemoveTodoListACType | AddTodoListACType | UpdateTodoListACType | ChangeFilterACType | setTodolistsACType;
export type AddTodoListACType = ReturnType<typeof addTodoListAC>;
export type RemoveTodoListACType = ReturnType<typeof removeTodoListAC>;
export type UpdateTodoListACType = ReturnType<typeof updateTodoListAC>;
export type ChangeFilterACType = ReturnType<typeof changeFilterAC>;
export type setTodolistsACType = ReturnType<typeof setTodolistsAC>;

export const addTodoListAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',
    payload: {todolist}
}) as const;
export const removeTodoListAC = (id: string) => ({type: 'REMOVE-TODOLIST', payload: {id: id}}) as const;
export const updateTodoListAC = (id: string, newTitle: string) => ({
    type: 'UPDATE-TODOLIST',
    payload: {id: id, newTitle: newTitle}
}) as const;
export const changeFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-FILTER',
    payload: {id: id, filter: filter}
}) as const;
export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: 'SET-TODOLISTS',
    payload: {todolists}
}) as const

export const setTodolists = (): AppThunk => async (dispatch)=> {
    const response = await todolistApi.getTodolist()
    dispatch(setTodolistsAC(response.data))
}

export const addTodoList = (title: string): AppThunk => async (dispatch)=> {
    const response = await todolistApi.createTodolist(title)
    response.data.resultCode === 0 && dispatch(addTodoListAC(response.data.data.item))
}

export const deleteTodoList = (todolistId: string): AppThunk => async (dispatch)=> {
    const response = await todolistApi.deleteTodolist(todolistId)
    response.data.resultCode === 0 && dispatch(removeTodoListAC(todolistId))
}

export const updateTodoList = (todolistId: string, newTitle: string): AppThunk => async (dispatch)=> {
    const response = await todolistApi.updateTodolist(todolistId, newTitle)
    response.data.resultCode === 0 && dispatch(updateTodoListAC(todolistId, newTitle))
}
