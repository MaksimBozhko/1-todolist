import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import React, {useCallback, useEffect} from 'react';
import {AddTodo} from './AddTodo';
import {EditableSpan} from './EditableSpan';
import {Tasks} from './Tasks';
import {setTasks} from '../reducer/tasksReducer';
import {deleteTodoList, FilterValuesType, updateTodoList} from '../reducer/todoListReducer';
import {useAppDispatch} from "../hooks/hooks";

type TodolistPropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};


export const TodoList: React.FC<TodolistPropsType> = ({ id, title, filter }) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setTasks(id))
    }, [])
  const onChangeRemoveTodoListHandler = () => {
      dispatch(deleteTodoList(id));
  }

  const onChangeUpdateTodoListHandler = useCallback((newTitle: string) => {
    dispatch(updateTodoList(id, newTitle));
  },[dispatch, id]);

  return (
    <div>
      <div>
        <EditableSpan callBack={onChangeUpdateTodoListHandler} title={title} />
        <IconButton onClick={onChangeRemoveTodoListHandler} aria-label="delete" size="small">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </div>

      <AddTodo id={id}  />
      <Tasks
        id={id}
        filter={filter}
      />
    </div>
  );
};
