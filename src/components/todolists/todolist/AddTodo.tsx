import React, { memo, useCallback } from 'react';
import { AddItemForm } from '../../addItemForm/AddItemForm';
import {useAppDispatch} from "../../../hooks/hooks-RTK";
import {addTask} from '../../../toolkit/taskSlice';
import {changeFilterAC, FilterValuesType} from '../../../toolkit/todolistSlice';

type AddTodoPropsType = {
  id: string;
  disabled?: boolean
}
export const AddTodo: React.FC<AddTodoPropsType> = memo(({ id, disabled }) => {
  const dispatch = useAppDispatch();
  const addTaskHandler = useCallback((title: string) => {
    dispatch(addTask({todoId: id, title}))
    dispatch(changeFilterAC({id, filter: 'all' as FilterValuesType}));
  }, [dispatch, id]);

  return <AddItemForm callBack={addTaskHandler} disabled={disabled} />;
});
