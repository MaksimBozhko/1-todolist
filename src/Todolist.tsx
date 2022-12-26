import React from 'react';
import Header from "./Header";
import TasksList from "./TasksList";
import {FilteredValuesType} from "./App";
import Form from "./Form";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    filterChange: (value: FilteredValuesType) => void
    onChangeTitle: (title: string) => void
    titleTask: string
    addNewTask: (title: string) => void
    filtered: FilteredValuesType
    changeIsDone: (taskId: number, isDone: boolean) => void
    error: boolean
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
            <Form onChangeTitle={props.onChangeTitle} titleTask={props.titleTask} addNewTask={props.addNewTask} error={props.error}/>
            <TasksList  tasks={props.tasks} removeTask={props.removeTask} filterChange={props.filterChange} filtered={props.filtered} changeIsDone={props.changeIsDone}/>
        </div>
    );
};

export default Todolist;

