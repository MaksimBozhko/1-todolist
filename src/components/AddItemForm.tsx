import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';
// import { Button } from './Button';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormType = {
  callBack: (title: string) => void;
};

export const AddItemForm: React.FC<AddItemFormType> = memo(({ callBack }) => {
  console.log('addItemForm')
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

  // const inputClasses = error ? 'inputError' : undefined;
  // const errorMessage = error && (
  //   <p style={{ color: 'hotpink', margin: 0 }}>Please, enter task title...</p>
  // );
  const buttonStyles = {
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
  };
  return (
    <div>
      {/* <input
        className={inputClasses}
        value={title}
        onChange={onChangeTitleHandler}
        onKeyDown={onKeyDownTitleHandler}
      /> */}
      <TextField
        value={title}
        onChange={onChangeTitleHandler}
        onKeyDown={onKeyDownTitleHandler}
        id="outlined-basic"
        label={error ? 'Title is required' : 'Plese type your title'}
        variant="outlined"
        size="small"
        error={error}
      />
      {/* <Button disabled={!title.trim()} handler={addItemHandler} name={'+'} /> */}
      <Button style={buttonStyles} onClick={addItemHandler} variant="contained">
        +
      </Button>
      {/* {errorMessage} */}
    </div>
  );
});
