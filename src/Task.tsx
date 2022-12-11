import React from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
    removeTasks: (id: number) => void
}

const Task = (props: TaskType) => {
    return (
        <li>
            <input type="checkbox" checked={props.isDone}/> <span>{props.title}</span>
            <button onClick={() => props.removeTasks(props.id)}>X</button>
        </li>
    );
};

export default Task;