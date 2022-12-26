import React, {ChangeEvent} from 'react';

type TaskTypeProps = {
    id: number
    title: string
    isDone: boolean
    removeTask: (taskId: number) => void
    changeIsDone: (taskId: number, isDone: boolean) => void
}

const Task = (props: TaskTypeProps) => {
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeIsDone(props.id, true)
    }
    const taskIsDoneClass = props.isDone ? 'isDone' : ''
    return (
        <li>
            <input onChange={onChangeInputHandler} type="checkbox" checked={props.isDone} />
            <span className={taskIsDoneClass}>{props.title}</span>
            <button onClick={() => props.removeTask(props.id)}>X</button>
        </li>
    );
};

export default Task;