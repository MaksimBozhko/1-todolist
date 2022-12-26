import React, {ChangeEvent} from 'react';

type TaskTypeProps = {
    id: string
    title: string
    isDone: boolean
    removeTask: (taskId: string) => void
    changeIsDone: (taskId: string, isDone: boolean) => void
}

const Task = (props: TaskTypeProps) => {
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeIsDone(props.id, e.target.checked)
    }
    const onClickButtonHandler = () => {
        props.removeTask(props.id)
    }
    const taskIsDoneClass = props.isDone ? 'isDone' : ''
    return (
        <li>
            <input onChange={onChangeInputHandler} type="checkbox" checked={props.isDone} />
            <span className={taskIsDoneClass}>{props.title}</span>
            <button onClick={onClickButtonHandler}>X</button>
        </li>
    );
};

export default Task;