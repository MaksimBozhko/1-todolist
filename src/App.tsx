import React from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilteredValuesType = 'all' | 'active' | 'completed'

const tasks2: Array<TaskType> = [
    {id: v1(), title: 'REACT', isDone: false},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'HTML & CSS', isDone: false}
]

function App() {
    const tasks: Array<TaskType> = [
        {id: v1(), title: 'HTML & CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: false},
        {id: v1(), title: 'REACT', isDone: true},
        {id: v1(), title: 'REDUX', isDone: false}
    ]
    return (
        <div className="App">
            <Todolist title='What to learn' tasks={tasks}/>
            {/*<Todolist title='What are you doing' tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
