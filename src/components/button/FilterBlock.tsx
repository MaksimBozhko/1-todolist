import React, { memo, useCallback } from 'react';
import Button from '@mui/material/Button';
import {useAppDispatch} from '../../common/hooks/hooks-RTK';
import {FilterValuesType, todolistsActions} from '../../common/toolkit/todolistSlice';

type FilterBlockPropsType = {
  id: string;
  filter: FilterValuesType;
};
export const FilterBlock: React.FC<FilterBlockPropsType> = memo(({ id, filter }) => {
  const dispatch = useAppDispatch();
  const changeFilter = useCallback((filter: FilterValuesType) => {
    dispatch(todolistsActions.changeTodolistFilter({id, filter}));
  },[dispatch, id]);

  return (
    <div>
      <Button
        variant={filter === 'all' ? 'outlined' : 'contained'}
        onClick={() => changeFilter('all')}
        color="success">
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'outlined' : 'contained'}
        onClick={() => changeFilter('active')}
        color="error">
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'outlined' : 'contained'}
        onClick={() => changeFilter('completed')}
        color="secondary">
        Completed
      </Button>
    </div>
  );
});
