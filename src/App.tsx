import Container from '@mui/material/Container/Container';
import React, {useEffect} from 'react';
import './App.css';
import {ButtonAppBar} from './components/button/ButtonAppBar';
import {setTodolists} from './reducer/todoListReducer';
import {useAppDispatch} from "./hooks/hooks";
import {Todolists} from "./components/todolists/Todolists";
import {ErrorSnackbar} from "./components/ErrorSnackBar";

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(setTodolists())
  }, [])

  return (
    <div>
      <ButtonAppBar />
      <Container fixed>
        <Todolists />
      </Container>
        <ErrorSnackbar />
    </div>
  );
};
