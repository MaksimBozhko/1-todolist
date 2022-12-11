import React from 'react';
import Header from "./Header";
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTasks: (id:number) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (value: string) => void
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
                <button onClick={ () => props.addTasks('new tasks') }>+</button>
            </div>
            <TasksList  tasks={props.tasks}
                        removeTasks={props.removeTasks}
                        changeFilter={props.changeFilter}/>
        </div>
    );
};

export default Todolist;

