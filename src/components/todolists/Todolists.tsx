import React, {useCallback} from 'react';
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import {TodoList} from "./todolist/TodoList";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {addTodoList} from "../../reducer/todoListReducer";

export const Todolists = () => {
    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todolists)

    const addTodoListHandler = useCallback((titleTodoList: string) => {
        dispatch(addTodoList(titleTodoList))
    },[dispatch]);

    const todolists = todoLists.map((t) => (
        <Grid item key={t.id}>
            <Paper style={{padding: '10px'}}>
                <TodoList id={t.id} title={t.title} filter={t.filter} entityStatus={t.entityStatus}/>
            </Paper>
        </Grid>
    ))
    return <>
        <Grid container style={{ padding: '20px' }}>
            <AddItemForm callBack={addTodoListHandler} />
        </Grid>
        <Grid container spacing={3}>
            {todolists}
        </Grid>
        </>
};