import React, { ChangeEvent, memo, useState } from 'react';

type EditableSpanType = {
  callBack: (title: string) => void;
  isDone?: boolean;
  title: string;
};

export const EditableSpan: React.FC<EditableSpanType> = memo(({ callBack, isDone, title }) => {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const onDoubleClickHandler = () => {

    setEdit(!edit);
    callBack(newTitle);
  };

  const onChangeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const isDoneClasses = isDone ? 'isDone' : 'notIsDone';
  return edit ? (
    <input
      value={newTitle}
      onBlur={onDoubleClickHandler}
      autoFocus
      onChange={onChangeItemTitleHandler}
    />
  ) : (
    <span onDoubleClick={onDoubleClickHandler} className={isDoneClasses}>
      {title}
    </span>
  );
});
