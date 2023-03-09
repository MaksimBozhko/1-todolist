import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {changeStatusAC, changeTaskTitle, deleteTask} from '../reducer/tasksReducer';
import {useAppDispatch} from "../hooks/hooks";

type TodoPropsType = {
  id: string;
  taskId: string;
  title: string;
  completed: boolean;
};

export const Task: React.FC<TodoPropsType> = memo(({ id, taskId, title, completed }) => {
  const dispatch = useAppDispatch()
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeStatusAC(id, taskId, e.currentTarget.checked));
  };

  const updateTaskHandler = useCallback((newTitle: string) => {
    dispatch(changeTaskTitle(id, taskId, newTitle))
  }, [dispatch, id, taskId]);

  const onChangeRemoveHandler = () => {
    dispatch(deleteTask(id, taskId))
  };
  return (
    <li key={id}>
      <Checkbox onChange={onChangeStatusHandler} checked={completed} />
      <EditableSpan callBack={updateTaskHandler} isDone={completed} title={title} />
      <IconButton onClick={onChangeRemoveHandler} aria-label="delete" size="small">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </li>
  );
});
