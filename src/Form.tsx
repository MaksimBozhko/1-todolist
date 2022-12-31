import React, {KeyboardEvent} from 'react';

type FormType = {
    todolistId: string
    onChangeTitle: (title: string) => void
    titleTask: string
    addNewTask: (title: string) => void
    error: boolean
    setError: (error: boolean) => void
}

const Form = (props: FormType) => {
    const onChangeInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        if(props.error) props.setError(false)
        props.onChangeTitle(e.currentTarget.value)
    }
    const onClickButtonHandler = () => {
        props.addNewTask(props.titleTask)
    }
    const onFocusInputHandler = () => {
        props.setError(false)
    }
    const onKeyInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && props.addNewTask(props.titleTask)
    }
    const errorInputClass = props.error ? 'inputError' : ''
    const errorMessage = props.error && <div className='errorMessage'>Please, enter message</div>
    return (
        <div>
            <input value={props.titleTask} onChange={onChangeInputHandler} onKeyDown={onKeyInputHandler}
                   className={errorInputClass} onFocus={onFocusInputHandler}/>
            <button onClick={onClickButtonHandler}>+</button>
            {errorMessage}
        </div>
    );
};

export default Form;