import React from 'react';
import TasksList from "./TasksList";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    return (
        <div>

            <div>
                <input/>
                <button>+</button>
            </div>
            <TasksList  tasks={props.tasks}/>
        </div>
    );
};

export default Todolist;

