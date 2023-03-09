import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {addTask} from '../reducer/tasksReducer';
import { changeFilterAC } from '../reducer/todoListReducer';
import { AddItemForm } from './AddItemForm';

type AddTodoPropsType = {
  id: string;
}
export const AddTodo: React.FC<AddTodoPropsType> = memo(({ id }) => {
  const dispatch = useDispatch();
  const addTaskHandler = useCallback((taskTitle: string) => {
    // @ts-ignore
    dispatch(addTask(id, taskTitle))
    dispatch(changeFilterAC(id, 'all'));
  }, [dispatch, id]);

  return <AddItemForm callBack={addTaskHandler} />;
});
