import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'REACT', isDone: true},
        {id: 4, title: 'REDUX', isDone: false}
    ])


    const removeTasks = (id:number) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }


    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks} removeTasks={removeTasks}/>
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
