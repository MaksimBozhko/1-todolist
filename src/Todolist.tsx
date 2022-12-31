import React, {useState} from 'react';
import Header from "./Header";
import TasksList from "./TasksList";
import {FilteredValuesType} from "./App";
import Form from "./Form";
import { v1 } from 'uuid';

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filterChange: (value: FilteredValuesType, todolistId: string) => void
    filter: FilteredValuesType
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeIsDone: (taskId: string, isDone: boolean, todolistId: string) => void
    /*
    onChangeTitle: (title: string) => void
    titleTask: string
    error: boolean*/
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const addNewTask = (title: string) => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const removeTask = (taskId: string) => {
        props.removeTask(taskId, props.id)
    }
    const changeIsDone = (taskId: string, isDone: boolean) => {
        props.changeIsDone(taskId, isDone, props.id)
    }
    const onChangeTitle = (title: string) => {
        setTitle(title)
    }

    const getFilteredTasksForRender = () => {
        let filteredTasks: Array<TaskType> = props.tasks
        if(props.filter === 'active') {
            filteredTasks = filteredTasks.filter(t => !t.isDone)
        }
        if(props.filter === 'completed') {
            filteredTasks = filteredTasks.filter(t => t.isDone)
        }
        return filteredTasks
    }
    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender()
    return (
        <div>
            <Header title={props.title}/>
            <Form onChangeTitle={onChangeTitle} titleTask={title} addNewTask={addNewTask} error={error} setError={setError} todolistId={props.id}/>
            <TasksList  tasks={filteredTasksForRender} removeTask={removeTask} filterChange={props.filterChange}
                        filtered={props.filter} changeIsDone={changeIsDone} todolistId={props.id}/>
        </div>
    );
};

export default Todolist;

