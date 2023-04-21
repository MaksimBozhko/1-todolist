import Container from '@mui/material/Container/Container'
import React, { useEffect } from 'react'
import './App.css'
import { ButtonAppBar } from '../components/button/ButtonAppBar'
import { Todolists } from '../features/todolists-list/todolists'
import { ErrorSnackbar } from '../components/ErrorSnackBar'
import { Route, Routes } from 'react-router-dom'
import { Login } from '../features/auth'
import { useAppSelector } from '../common/hooks/hooks-RTK'
import { appThunks } from './appSlice'
import { Circular } from '../components/circular/Circular'
import { useActions } from '../common/hooks/useActions'
import { getIsInitialized } from './app.selectors'

export const App = () => {
	const isInitialized = useAppSelector(getIsInitialized)
	const { initializeApp } = useActions(appThunks)

	useEffect(() => {
		initializeApp({})
	}, [])

	if (!isInitialized) return <Circular />
	return (
		<>
			<ButtonAppBar />
			<Container fixed>
				<Routes>
					<Route path='/1-todolist' element={<Todolists />} />
					<Route path='/1-todolist/login' element={<Login />} />
				</Routes>
				<ErrorSnackbar />
			</Container>
		</>
	)
}
