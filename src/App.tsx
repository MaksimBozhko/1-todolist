import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilteredValuesType = 'all' | 'active' | 'completed'
type todoListType = {
    id: string
    title: string
    filter: FilteredValuesType
}

function App() {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const [todolists, setTodolist] = useState<Array<todoListType>>([
        {id: todoListId1, title: 'what to learn', filter: 'active'},
        {id: todoListId2, title: 'what to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState({
        [todoListId1]: [
            {id: v1(), title: 'HTML & CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'REACT', isDone: true},
            {id: v1(), title: 'REDUX', isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: 'REACT', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'HTML & CSS', isDone: false}
        ],
    })

    const addTask = (title: string, todolistId: string) => {
        const task = {id: v1(), title: title, isDone: false}
        let tlTasks = tasks[todolistId]
        const newTasks = [task, ...tlTasks]
        tasks[todolistId] = newTasks
        setTasks({...tasks})
    }
    const removeTask = (taskId: string, todolistId: string) => {
        let filteredTasks = tasks[todolistId].filter(t => t.id != taskId)
        tasks[todolistId] = filteredTasks
        setTasks({...tasks})
    }
    const filterChange = (value: FilteredValuesType, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) todolist.filter = value
        setTodolist([...todolists])
    }
    const changeIsDone = (taskId: string, isDone: boolean, todolistId: string) => {
        let task = tasks[todolistId].find(t => t.id === taskId)
        if(task) {
            task.isDone = isDone
            setTasks({...tasks})
        }

    }
    return (
        <div className="App">
            {todolists.map(tl => <Todolist key={tl.id} title={tl.title}
                                           tasks={tasks[tl.id]} filterChange={filterChange}
                                           id={tl.id} filter={tl.filter}
                                           addTask={addTask} removeTask={removeTask} changeIsDone={changeIsDone}/>)}
        </div>
    );
}

export default App;
