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

    const taskItems = props.tasks.map(el => <Task key={el.id} {...el} removeTask={props.removeTask}/> )
    const getOnClickSetFilterHandler = (filter: FilteredValuesType) => () => props.filterChange(filter)
    return (
        <div>
            <ul>
                {taskItems}
            </ul>
            <div>
                <button onClick={getOnClickSetFilterHandler('all')}>All</button>
                <button onClick={getOnClickSetFilterHandler("active")}>Active</button>
                <button onClick={getOnClickSetFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TasksList;