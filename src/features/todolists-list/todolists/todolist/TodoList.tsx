import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useCallback, useEffect } from 'react'
import { AddTodo } from './AddTodo'
import { EditableSpan } from '../../../../components/editableSpan/EditableSpan'
import { Tasks } from '../../tasks'
import { FilterValuesType, todolistsThunks } from '../todolistSlice'
import { RequestStatusType } from '../../../../app/appSlice'
import { tasksThunks } from '../../tasks/taskSlice'
import { useActions } from '../../../../common/hooks/useActions'

type TodolistPropsType = {
	id: string
	title: string
	filter: FilterValuesType
	entityStatus: RequestStatusType
}

export const TodoList: React.FC<TodolistPropsType> = ({ id, title, filter, entityStatus }) => {
	const { fetchTasks } = useActions(tasksThunks)
	const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks)

	useEffect(() => {
		fetchTasks(id)
	}, [])

	const onChangeRemoveTodoListHandler = () => {
		removeTodolist(id)
	}

	const onChangeUpdateTodoListHandler = useCallback(
		(title: string) => {
			changeTodolistTitle({ id, title })
		},
		[id]
	)

	return (
		<div>
			<div>
				<EditableSpan callBack={onChangeUpdateTodoListHandler} title={title} />
				<IconButton
					onClick={onChangeRemoveTodoListHandler}
					disabled={entityStatus === 'loading'}
					aria-label='delete'
					size='small'
				>
					<DeleteIcon fontSize='inherit' />
				</IconButton>
			</div>
			<AddTodo id={id} disabled={entityStatus === 'loading'} />
			<Tasks id={id} filter={filter} />
		</div>
	)
}
