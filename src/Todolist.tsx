import React from 'react';
import Header from "./Header";
import TasksList from "./TasksList";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id:number) => void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <Header title={props.title}/>
            <div>
                <input/>
                <button>+</button>
            </div>
            <TasksList  tasks={props.tasks} removeTasks={props.removeTasks}/>
        </div>
    );
};

export default Todolist;

