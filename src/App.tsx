import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'REACT', isDone: true},
        {id: 4, title: 'REDUX', isDone: false}
    ])
    let [filter, setFilter] = useState('all')

    const removeTasks = (id:number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const addTasks = (value: string) => {
        let newTasks = {id: 5, title: value, isDone: false}
        tasks.push(newTasks)
        setTasks(tasks)
    }

    let tasksForTodoList = tasks
    if(filter == 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if(filter == 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }


    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodoList}
                      removeTasks={removeTasks}
                      changeFilter={changeFilter}
                      addTasks={addTasks}
            />
        </div>
    );
}

export default App;


/*
const tasks2: Array<TaskType> = [
    {id: 1, title: 'REACT', isDone: false},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'HTML & CSS', isDone: false}
]
const title1: string = 'What to learn'
const title2: string = 'What are you doing'*/
