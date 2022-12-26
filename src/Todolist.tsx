import React, {useState} from 'react';
import Header from "./Header";
import TasksList from "./TasksList";
import {FilteredValuesType} from "./App";
import Form from "./Form";
import { v1 } from 'uuid';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    /*removeTask: (taskId: number) => void
    filterChange: (value: FilteredValuesType) => void
    onChangeTitle: (title: string) => void
    titleTask: string
    addNewTask: (title: string) => void
    filtered: FilteredValuesType
    changeIsDone: (taskId: number, isDone: boolean) => void
    error: boolean*/
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = (props: TodolistPropsType) => {
    const [tasks, setTasks] = useState<Array<TaskType>>(props.tasks)
    const [filtered, setFiltered] = useState<FilteredValuesType>('all')
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (title: string) => {
        setTitle(title)
    }
    const addNewTask = (title: string) => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            setTasks([{id: v1(), title: title, isDone: false}, ...tasks])
        } else {
            setError(true)
        }
        setTitle('')
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const filterChange = (value: FilteredValuesType) => {
        setFiltered(value)
    }
    const changeIsDone = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if(task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

    const getFilteredTasksForRender = () => {
        let filteredTasks: Array<TaskType> = tasks
        if(filtered === 'active') {
            filteredTasks = tasks.filter(t => !t.isDone)
        }
        if(filtered === 'completed') {
            filteredTasks = tasks.filter(t => t.isDone)
        }
        return filteredTasks
    }
    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender()
    return (
        <div>
            <Header title={props.title}/>
            <Form onChangeTitle={onChangeTitle} titleTask={title} addNewTask={addNewTask} error={error} setError={setError}/>
            <TasksList  tasks={filteredTasksForRender} removeTask={removeTask} filterChange={filterChange} filtered={filtered} changeIsDone={changeIsDone}/>
        </div>
    );
};

export default Todolist;

