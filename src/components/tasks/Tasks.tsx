import React, { memo, useState } from 'react'
import { Reorder } from 'framer-motion'
import { FilterBlock } from '../button/FilterBlock'
import { Task } from './task/Task'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TaskStatuses, TaskType } from '../../common/api/todolist-api'
import { FilterValuesType } from '../../common/toolkit/todolistSlice'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks-RTK'
import { tasksActions } from '../../common/toolkit/taskSlice'

type TasksPropsType = {
	id: string
	filter: FilterValuesType
}

export const Tasks: React.FC<TasksPropsType> = memo(
	({ id: todoId, filter }) => {
		const dispatch = useAppDispatch()
		const tasks = useAppSelector(state => state.tasks)
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
			dispatch(tasksActions.reorderTasks({ todoId, newOrder }))
		}

		let filteredTasksToRenderMap = filteredTasksToRender.length ? (
			<Reorder.Group
				axis='y'
				values={filteredTasksToRender}
				onReorder={onReorderHandler}
			>
				{filteredTasksToRender.map(task => {
					return (
						<Reorder.Item key={task.id} value={task}>
							{
								<Task
									key={task.id}
									id={todoId}
									taskId={task.id}
									title={task.title}
									status={task.status}
								/>
							}
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
	}
)
