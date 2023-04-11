import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useCallback, useEffect } from 'react'
import { AddTodo } from './AddTodo'
import { EditableSpan } from '../../editableSpan/EditableSpan'
import { Tasks } from '../../tasks/Tasks'
import { useAppDispatch } from '../../../common/hooks/hooks-RTK'
import {
	FilterValuesType,
	todolistsThunks
} from '../../../common/toolkit/todolistSlice'
import { RequestStatusType } from '../../../common/toolkit/appSlice'
import { tasksThunks } from '../../../common/toolkit/taskSlice'

type TodolistPropsType = {
	id: string
	title: string
	filter: FilterValuesType
	entityStatus: RequestStatusType
}

export const TodoList: React.FC<TodolistPropsType> = ({
	id,
	title,
	filter,
	entityStatus
}) => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(tasksThunks.fetchTasks(id))
	}, [])
	const onChangeRemoveTodoListHandler = () => {
		dispatch(todolistsThunks.removeTodolist(id))
	}
	const onChangeUpdateTodoListHandler = useCallback(
		(title: string) => {
			dispatch(todolistsThunks.changeTodolistTitle({ id, title }))
		},
		[dispatch, id]
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
