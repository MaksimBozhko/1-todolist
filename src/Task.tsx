import React from 'react';

type TaskTypeProps = {
    id: number
    title: string
    isDone: boolean
    removeTask: (taskId: number) => void
}

const Task = (props: TaskTypeProps) => {
    return (
        <li>
            <input type="checkbox" checked={props.isDone}/>
            <span>{props.title}</span>
            <button onClick={() => props.removeTask(props.id)}>X</button>
        </li>
    );
};

export default Task;