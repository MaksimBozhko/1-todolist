import React, { memo, useCallback } from 'react'
import { AddItemForm } from '../../../../components/addItemForm/AddItemForm'
import { FilterValuesType, todolistsActions } from '../todolistSlice'
import { tasksThunks } from '../../tasks/taskSlice'
import { useActions } from '../../../../common/hooks/useActions'

type AddTodoPropsType = {
	id: string
	disabled?: boolean
}
export const AddTodo: React.FC<AddTodoPropsType> = memo(({ id, disabled }) => {
	const { addTask } = useActions(tasksThunks)
	const { changeTodolistFilter } = useActions(todolistsActions)

	const addTaskHandler = useCallback(
		(title: string) => {
			addTask({ title, id })
			changeTodolistFilter({ id, filter: 'all' as FilterValuesType })
		},
		[id]
	)

	return <AddItemForm callBack={addTaskHandler} disabled={disabled} />
})
