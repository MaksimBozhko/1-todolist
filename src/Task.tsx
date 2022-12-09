import React from 'react';

type TaskType = {
    title: string
    isDone: boolean
}

const Task = (props: TaskType) => {
    return (
        <li><input type="checkbox" checked={props.isDone}/> <span>{props.title}</span></li>
    );
};

export default Task;