import React from 'react';
import {TaskType} from "./Todolist";
import Task from "./Task";
import {FilterValuesType} from "./App";

type TasksListType = {
    tasks: Array<TaskType>
    removeTasks: (id:number) => void
    changeFilter: (value: FilterValuesType) => void
}

const TasksList = (props: TasksListType) => {
    return (
        <div>
            <ul>
                {props.tasks.map(el => <Task id={el.id} title={el.title} isDone={el.isDone} removeTasks={props.removeTasks} />)}
                {/*<Task  title={props.tasks[0].title} isDone={props.tasks[0].isDone}/>
                <Task  title={props.tasks[1].title} isDone={props.tasks[1].isDone}/>
                <Task  title={props.tasks[2].title} isDone={props.tasks[2].isDone}/>*/}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TasksList;