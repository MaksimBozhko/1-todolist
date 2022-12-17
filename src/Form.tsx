import React from 'react';

type FormType = {
    onChangeTitle: (title: string) => void
    titleTask: string
    addNewTask: (title: string) => void
}

const Form = (props: FormType) => {
    const onChangeInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        props.onChangeTitle(e.currentTarget.value)
    }
    const onClickButtonHandler = () => {
        props.addNewTask(props.titleTask)
    }
    return (
        <div>
            <input value={props.titleTask} onChange={onChangeInputHandler}/>
            <button onClick={onClickButtonHandler}>+</button>
        </div>
    );
};

export default Form;