import React, { memo } from 'react'
import { Reorder } from 'framer-motion'
import { FilterBlock } from '../../../components/button/FilterBlock'
import { Task } from './task/Task'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { FilterValuesType } from '../todolists/todolistSlice'
import { useAppSelector } from '../../../common/hooks/hooks-RTK'
import { tasksActions } from './taskSlice'
import { TaskStatuses, TaskType } from '../../../common/types/common.types'
import { useActions } from '../../../common/hooks/useActions'
import { getTasks } from './tasks.selectors'

type TasksPropsType = {
	id: string
	filter: FilterValuesType
}

export const Tasks: React.FC<TasksPropsType> = memo(({ id: todoId, filter }) => {
	const { reorderTasks } = useActions(tasksActions)
	const tasks = useAppSelector(getTasks)

	const [listRef] = useAutoAnimate<HTMLUListElement>()
	const getFilteredTasks = () => {
		switch (filter) {
			case 'active':
				return tasks[todoId].filter(t => t.status === TaskStatuses.New)
			case 'completed':
				return tasks[todoId].filter(t => t.status === TaskStatuses.Completed)
			default:
				return tasks[todoId]
		}
	}
	let filteredTasksToRender: Array<TaskType> = getFilteredTasks()

	const onReorderHandler = (newOrder: TaskType[]) => {
		reorderTasks({ todoId, newOrder })
	}

	let filteredTasksToRenderMap = filteredTasksToRender.length ? (
		<Reorder.Group axis='y' values={filteredTasksToRender} onReorder={onReorderHandler}>
			{filteredTasksToRender.map(task => {
				return (
					<Reorder.Item as={'li'} key={task.id} value={task}>
						{<Task key={task.id} id={todoId} taskId={task.id} title={task.title} status={task.status} />}
					</Reorder.Item>
				)
			})}
		</Reorder.Group>
	) : (
		<span>Tasks list is empty</span>
	)

	return (
		<div>
			<ul ref={listRef}>{filteredTasksToRenderMap}</ul>
			<FilterBlock id={todoId} filter={filter} />
		</div>
	)
})
