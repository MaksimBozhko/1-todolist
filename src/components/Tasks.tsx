import React, { memo} from 'react';
import { FilterBlock } from './FilterBlock';
import { Task } from './Task';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../reducer/store';
import {FilterValuesType} from "../reducer/todoListReducer";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {TasksStateType} from "../reducer/tasksReducer";

type TasksPropsType = {
  id: string;
  filter: FilterValuesType;
};

export const Tasks: React.FC<TasksPropsType> = memo(({ id: todoId, filter }) => {
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks);
  const [listRef] = useAutoAnimate<HTMLUListElement>();

  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks[todoId].filter((t) => t.status === TaskStatuses.New);
      case 'completed':
        return tasks[todoId].filter((t) => t.status === TaskStatuses.Completed);
      default:
        return tasks[todoId];
    }
  };
  let filteredTasksToRender: Array<TaskType> = getFilteredTasks();

  let filteredTasksToRenderMap = filteredTasksToRender.length ? (
    filteredTasksToRender.map(({ id, title, status }) => {
      return <Task key={id} id={todoId} taskId={id} title={title} status={status} />;
    })
  ) : (
    <span>Tasks list is empty</span>
  );

  return (
    <div>
      <ul ref={listRef}>{filteredTasksToRenderMap}</ul>

      <FilterBlock id={todoId} filter={filter} />
    </div>
  );
});
