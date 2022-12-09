import React from 'react';

type Task = {
    id: number
    title: string
    isDone: boolean
}

const Task = (props: Task) => {
    return (
        <div>
          <li><input type="checkbox" checked={props.isDone}/>{props.title}</li>
        </div>
    );
};

export default Task;