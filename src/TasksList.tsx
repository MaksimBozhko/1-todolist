import React from 'react';
import {TaskType} from "./Todolist";
import Task from "./Task";
import {FilteredValuesType} from "./App";

type TasksListType = {
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    filterChange: (value: FilteredValuesType) => void
    filtered: FilteredValuesType
    changeIsDone: (taskId: number, isDone: boolean) => void
}

const TasksList = (props: TasksListType) => {
    const taskItems = props.tasks.map(el => <Task key={el.id} {...el} removeTask={props.removeTask} changeIsDone={props.changeIsDone}/> )
    const getOnClickSetFilterHandler = (filter: FilteredValuesType) => () => props.filterChange(filter)
    return (
        <div>
            <ul>{taskItems}</ul>
            <div>
                <button className={props.filtered === 'all' ? 'activeFilter' : ''}
                    onClick={getOnClickSetFilterHandler('all')}>All</button>
                <button className={props.filtered === 'active' ? 'activeFilter' : ''}
                    onClick={getOnClickSetFilterHandler("active")}>Active</button>
                <button className={props.filtered === 'completed' ? 'activeFilter' : ''}
                    onClick={getOnClickSetFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TasksList;