import React from 'react';

type FormType = {
    onChangeTitle: (title: string) => void
    titleTask: string
    addNewTask: (title: string) => void
    error: boolean
}

const Form = (props: FormType) => {
    const onChangeInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        props.onChangeTitle(e.currentTarget.value)
    }
    const onClickButtonHandler = () => {
        props.addNewTask(props.titleTask)
    }
    const errorInputClass = props.error ? 'inputError' : ''
    const errorMessage = props.error && <div className='errorMessage'>Please, enter message</div>
    return (
        <div>
            <input value={props.titleTask} onChange={onChangeInputHandler} className={errorInputClass}/>
            <button onClick={onClickButtonHandler}>+</button>
            {errorMessage}
        </div>
    );
};

export default Form;