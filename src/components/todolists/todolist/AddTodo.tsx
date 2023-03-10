import React, { memo, useCallback } from 'react';
import {addTask} from '../../../reducer/tasksReducer';
import { changeFilterAC } from '../../../reducer/todoListReducer';
import { AddItemForm } from '../../addItemForm/AddItemForm';
import {useAppDispatch} from "../../../hooks/hooks";

type AddTodoPropsType = {
  id: string;
  disabled?: boolean
}
export const AddTodo: React.FC<AddTodoPropsType> = memo(({ id, disabled }) => {
  const dispatch = useAppDispatch();
  const addTaskHandler = useCallback((taskTitle: string) => {
    dispatch(addTask(id, taskTitle))
    dispatch(changeFilterAC(id, 'all'));
  }, [dispatch, id]);

  return <AddItemForm callBack={addTaskHandler} disabled={disabled} />;
});
