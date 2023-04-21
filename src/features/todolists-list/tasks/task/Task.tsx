import React, { ChangeEvent, memo, useCallback } from 'react'
import { EditableSpan } from '../../../../components/editableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import { tasksThunks } from '../taskSlice'
import { TaskStatuses } from '../../../../common/types/common.types'
import { useActions } from '../../../../common/hooks/useActions'

type TodoPropsType = {
	id: string
	taskId: string
	title: string
	status: TaskStatuses
}

export const Task: React.FC<TodoPropsType> = memo(({ id, taskId, title, status }) => {
	const { updateTask, removeTask } = useActions(tasksThunks)

	const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const status = e.currentTarget.checked ? 2 : 0
		updateTask({ todolistId: id, taskId, domainModel: { status } })
	}

	const updateTaskHandler = useCallback(
		(newTitle: string) => {
			updateTask({ todolistId: id, taskId, domainModel: { title: newTitle } })
		},
		[id, taskId]
	)

	const onChangeRemoveHandler = () => {
		removeTask({ id, taskId })
	}

	return (
		<li key={id}>
			<Checkbox onChange={onChangeStatusHandler} checked={!!status} />
			<EditableSpan callBack={updateTaskHandler} isDone={!!status} title={title} />
			<IconButton onClick={onChangeRemoveHandler} aria-label='delete' size='small'>
				<DeleteIcon fontSize='inherit' />
			</IconButton>
		</li>
	)
})
