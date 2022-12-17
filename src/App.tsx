import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

export type FilteredValuesType = 'all' | 'active' | 'completed'

const tasks2: Array<TaskType> = [
    {id: 1, title: 'REACT', isDone: false},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'HTML & CSS', isDone: false}
]

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML & CSS', isDone: true},
        {id: 2, title: 'JS', isDone: false},
        {id: 3, title: 'REACT', isDone: true},
        {id: 4, title: 'REDUX', isDone: false}
    ])
    const [filtered, setFiltered] = useState<FilteredValuesType>('all')
    const [title, setTitle] = useState<string>('')

    const onChangeTitle = (title: string) => {
        setTitle(title)
    }
    const addNewTask = (title: string) => {
        setTasks([...tasks, {id:5, title: title, isDone: false}])
    }

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
    const filterChange = (value: FilteredValuesType) => {
        setFiltered(value)
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
        <div className="App">
            <Todolist title='What to learn'
                      tasks={filteredTasksForRender}
                      removeTask={removeTask}
                      filterChange={filterChange}
                      onChangeTitle={onChangeTitle}
                      titleTask={title}
                      addNewTask={addNewTask}/>
            {/*<Todolist title='What are you doing' tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
