import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormType = {
  callBack: (title: string) => void
  disabled?: boolean
};

export const AddItemForm: React.FC<AddItemFormType> = memo(({ callBack, disabled = false }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<boolean>(false);

  const addItemHandler = () => {
    let newTitle = title.trim();
    if (newTitle !== '') {
      callBack(title);
      setTitle('');
    } else {
      setError(true);
    }
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    setTitle(e.currentTarget.value);
  };

  const onKeyDownTitleHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addItemHandler();
    }
  };

  const buttonStyles = {
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
  };
  return (
    <div>
      <TextField
        disabled={disabled}
        value={title}
        onChange={onChangeTitleHandler}
        onKeyDown={onKeyDownTitleHandler}
        id="outlined-basic"
        label={error ? 'Title is required' : 'Plese type your title'}
        variant="outlined"
        size="small"
        error={error}
      />
      <Button style={buttonStyles} onClick={addItemHandler} variant="contained" disabled={disabled}>
        +
      </Button>
    </div>
  );
});
