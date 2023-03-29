import React, {ChangeEvent, memo, useCallback} from 'react';
import {EditableSpan} from '../../editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import {useAppDispatch} from "../../../hooks/hooks-RTK";
import {TaskStatuses} from "../../../api/todolist-api";
import {deleteTask, updateTask} from '../../../toolkit/taskSlice';

type TodoPropsType = {
  id: string;
  taskId: string;
  title: string;
  status: TaskStatuses;
};

export const Task: React.FC<TodoPropsType> = memo(({ id, taskId, title, status }) => {
  const dispatch = useAppDispatch()
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const status = e.currentTarget.checked ? 2 : 0
    dispatch(updateTask({todolistId: id, taskId, domainModel: {status}}));
  };

  const updateTaskHandler = useCallback((newTitle: string) => {
    dispatch(updateTask({todolistId: id, taskId, domainModel: {title: newTitle}}))
  }, [dispatch, id, taskId]);

  const onChangeRemoveHandler = () => {
    dispatch(deleteTask({todoId: id, taskId}))
  };
  return (
    <li key={id}>
      <Checkbox onChange={onChangeStatusHandler} checked={!!status} />
      <EditableSpan callBack={updateTaskHandler} isDone={!!status} title={title} />
      <IconButton onClick={onChangeRemoveHandler} aria-label="delete" size="small">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </li>
  );
});
