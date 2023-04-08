import React, { memo, useCallback } from 'react';
import { AddItemForm } from '../../addItemForm/AddItemForm';
import {useAppDispatch} from "../../../common/hooks/hooks-RTK";
import {FilterValuesType, todolistsActions} from '../../../common/toolkit/todolistSlice';
import {tasksThunks} from '../../../common/toolkit/taskSlice';


type AddTodoPropsType = {
  id: string;
  disabled?: boolean
}
export const AddTodo: React.FC<AddTodoPropsType> = memo(({ id, disabled }) => {
  const dispatch = useAppDispatch();
  const addTaskHandler = useCallback((title: string) => {
    dispatch(tasksThunks.addTask({title, id}))
    dispatch(todolistsActions.changeTodolistFilter({id, filter: 'all' as FilterValuesType}));
  }, [dispatch, id]);

  return <AddItemForm callBack={addTaskHandler} disabled={disabled} />;
});
