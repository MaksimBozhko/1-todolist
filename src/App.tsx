import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {v1} from 'uuid';
import './App.css';
import {AddItemForm} from './components/AddItemForm';
import {ButtonAppBar} from './components/ButtonAppBar';
import {TodoList} from './components/TodoList';
import {AppRootStateType} from './reducer/store';
import {addTasksAC} from './reducer/tasksReducer';
import {addTodoListAC, TodolistDomainType} from './reducer/todoListReducer';


export const App = () => {
  
  const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
  const dispatch = useDispatch();

  const addTodoListHandler = useCallback((titleTodoList: string) => {
    const todolistId = v1()
    dispatch(addTodoListAC(todolistId, titleTodoList));
    dispatch(addTasksAC(todolistId));
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
