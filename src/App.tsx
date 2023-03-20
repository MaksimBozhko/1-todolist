import Container from '@mui/material/Container/Container';
import React, {useEffect} from 'react';
import './App.css';
import {ButtonAppBar} from './components/button/ButtonAppBar';
import {Todolists} from './components/todolists/Todolists';
import {ErrorSnackbar} from './components/ErrorSnackBar';
import {Route, Routes} from 'react-router-dom';
import {Login} from './components/login/Login';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {initializeApp} from './reducer/appReducer';


export const App = () => {
    const {isInitialized} = useAppSelector(state => state.app)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializeApp())
    }, [])
    if (!isInitialized) return <Box sx={{display: 'flex', justifyContent: 'center', marginTop : '500px' }}><CircularProgress /></Box>
    return <>
        <ButtonAppBar/>
        <Container fixed>
            <Routes>
                <Route path="/1-todolist" element={<Todolists/>}/>
                <Route path="/1-todolist/login" element={<Login/>}/>
            </Routes>
            <ErrorSnackbar/>
        </Container>
    </>
};

