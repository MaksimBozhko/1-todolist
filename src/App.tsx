import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from './components/AddItemForm';
import {ButtonAppBar} from './components/ButtonAppBar';
import {TodoList} from './components/TodoList';
import {addTodoList, setTodolists} from './reducer/todoListReducer';
import {useAppDispatch, useAppSelector} from "./hooks/hooks";

export const App = () => {
  
  const todoLists = useAppSelector(state => state.todolists)
  const dispatch = useAppDispatch()
  useEffect(() => {
      dispatch(setTodolists())
  }, [])

  const addTodoListHandler = useCallback((titleTodoList: string) => {
      dispatch(addTodoList(titleTodoList))
  },[dispatch]);

  const todoListsMap = todoLists.map((t) => (
    <Grid item key={t.id}>
      <Paper style={{ padding: '10px' }}>
        <TodoList
          id={t.id}
          title={t.title}
          filter={t.filter}
        />
      </Paper>
    </Grid>
  ));
  return (
    <div>
      <ButtonAppBar />
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm callBack={addTodoListHandler} />
        </Grid>
        <Grid container spacing={3}>
          {todoListsMap}
        </Grid>
      </Container>
    </div>
  );
};
