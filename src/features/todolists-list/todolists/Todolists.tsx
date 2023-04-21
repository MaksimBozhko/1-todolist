import React, { useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid/Grid'
import Paper from '@mui/material/Paper/Paper'
import { TodoList } from './todolist/TodoList'
import { useAppSelector } from '../../../common/hooks/hooks-RTK'
import { AddItemForm } from '../../../components/addItemForm/AddItemForm'
import { Navigate } from 'react-router-dom'
import { todolistsThunks } from './todolistSlice'
import { useActions } from '../../../common/hooks/useActions'
import { getIsLoggedIn } from '../../auth'
import { getTodolists } from './todolists.selectors'

export const Todolists = () => {
	const { fetchTodoLists, addTodolist } = useActions(todolistsThunks)
	const todoLists = useAppSelector(getTodolists)
	const isLoggedIn = useAppSelector(getIsLoggedIn)

	useEffect(() => {
		isLoggedIn && fetchTodoLists({})
	}, [])

	const addTodoListHandler = useCallback((title: string) => {
		addTodolist(title)
	}, [])

	const todolists = todoLists.map(t => (
		<Grid item key={t.id}>
			<Paper style={{ padding: '10px' }}>
				<TodoList id={t.id} title={t.title} filter={t.filter} entityStatus={t.entityStatus} />
			</Paper>
		</Grid>
	))

	if (!isLoggedIn) return <Navigate to='/1-todolist/login' />
	return (
		<>
			<Grid container style={{ padding: '20px' }}>
				<AddItemForm callBack={addTodoListHandler} />
			</Grid>
			<Grid container spacing={3}>
				{todolists}
			</Grid>
		</>
	)
}
