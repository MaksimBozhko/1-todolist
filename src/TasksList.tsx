import React from 'react';
import {TaskType} from "./Todolist";
import Task from "./Task";
import {FilteredValuesType} from "./App";

type TasksListType = {
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    filterChange: (value: FilteredValuesType) => void
}

const TasksList = (props: TasksListType) => {
    return (
        <div>
            <ul>
                {props.tasks.map(el => <Task key={el.id} {...el} removeTask={props.removeTask}/> )}
            </ul>
            <div>
                <button onClick={() => props.filterChange('all')}>All</button>
                <button onClick={() => props.filterChange('active')}>Active</button>
                <button onClick={() => props.filterChange('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TasksList;