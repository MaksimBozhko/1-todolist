import React, { memo, useCallback } from 'react'
import Button from '@mui/material/Button'
import { FilterValuesType, todolistsActions } from '../../features/todolists-list/todolists/todolistSlice'
import { useActions } from '../../common/hooks/useActions'

type FilterBlockPropsType = {
	id: string
	filter: FilterValuesType
}
export const FilterBlock: React.FC<FilterBlockPropsType> = memo(({ id, filter }) => {
	const { changeTodolistFilter } = useActions(todolistsActions)
	const changeFilter = useCallback(
		(filter: FilterValuesType) => {
			changeTodolistFilter({ id, filter })
		},
		[id]
	)

	return (
		<div>
			<Button variant={filter === 'all' ? 'outlined' : 'contained'} onClick={() => changeFilter('all')} color='success'>
				All
			</Button>
			<Button
				variant={filter === 'active' ? 'outlined' : 'contained'}
				onClick={() => changeFilter('active')}
				color='error'
			>
				Active
			</Button>
			<Button
				variant={filter === 'completed' ? 'outlined' : 'contained'}
				onClick={() => changeFilter('completed')}
				color='secondary'
			>
				Completed
			</Button>
		</div>
	)
})
