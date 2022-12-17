import React from 'react';
import Header from "./Header";
import TasksList from "./TasksList";
import {FilteredValuesType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    filterChange: (value: FilteredValuesType) => void
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
            <TasksList  tasks={props.tasks} removeTask={props.removeTask} filterChange={props.filterChange}/>
        </div>
    );
};

export default Todolist;

