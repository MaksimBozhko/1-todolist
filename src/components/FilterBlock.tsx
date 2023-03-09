import React, { memo, useCallback } from 'react';
import Button from '@mui/material/Button';
import {changeFilterAC, FilterValuesType} from '../reducer/todoListReducer';
import { useDispatch } from 'react-redux';

type FilterBlockPropsType = {
  id: string;
  filter: FilterValuesType;
};
export const FilterBlock: React.FC<FilterBlockPropsType> = memo(({ id, filter }) => {
  console.log('FilterBlock')
  const dispatch = useDispatch();
  const changeFilter = useCallback((value: FilterValuesType) => {
    dispatch(changeFilterAC(id, value));
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
