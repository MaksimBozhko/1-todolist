import React, {useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import {TodoList} from "./todolist/TodoList";
import {useAppDispatch, useAppSelector} from "../../common/hooks/hooks-RTK";
import {AddItemForm} from "../addItemForm/AddItemForm";
import {Navigate} from 'react-router-dom';
import {todolistsThunks} from '../../common/toolkit/todolistSlice';

export const Todolists = () => {
    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todolists)
    const {isLoggedIn} = useAppSelector(state => state.auth)
    useEffect(() => {
        isLoggedIn && dispatch(todolistsThunks.fetchTodoLists())
    }, [])

    const addTodoListHandler = useCallback((title: string) => {
        dispatch(todolistsThunks.addTodolist(title))
    },[dispatch]);

    const todolists = todoLists.map((t) => (
        <Grid item key={t.id}>
            <Paper style={{padding: '10px'}}>
                <TodoList id={t.id} title={t.title} filter={t.filter} entityStatus={t.entityStatus}/>
            </Paper>
        </Grid>
    ))

    if (!isLoggedIn) return <Navigate to='/1-todolist/login' />
    return <>
        <Grid container style={{ padding: '20px' }}>
            <AddItemForm callBack={addTodoListHandler} />
        </Grid>
        <Grid container spacing={3}>
            {todolists}
        </Grid>
        </>
};