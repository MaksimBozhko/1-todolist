import React from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

function App() {
    const tasks1: Array<TaskType> = [
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'REACT', isDone: true},
        {id: 4, title: 'REDUX', isDone: false}
    ]
    const tasks2: Array<TaskType> = [
        {id: 1, title: 'REACT', isDone: false},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'HTML & CSS', isDone: false}
    ]
    const title1: string = 'What to learn'
    const title2: string = 'What are you doing'
    return (
        <div className="App">
            <Todolist title={title1} tasks={tasks1}/>
            <Todolist title={title2} tasks={tasks2}/>
        </div>
    );
}

export default App;
