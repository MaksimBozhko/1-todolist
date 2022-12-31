import React from 'react';
import {TaskType} from "./Todolist";
import Task from "./Task";
import {FilteredValuesType} from "./App";

type TasksListType = {
    todolistId: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    filterChange: (value: FilteredValuesType, todolistId: string) => void
    filtered: FilteredValuesType
    changeIsDone: (taskId: string, isDone: boolean) => void
}

const TasksList = (props: TasksListType) => {
    const taskItems = props.tasks.map(el => <Task key={el.id} {...el} removeTask={props.removeTask} changeIsDone={props.changeIsDone}/> )
    const getOnClickSetFilterHandler = (filter: FilteredValuesType) => () => props.filterChange(filter, props.todolistId)
    const getClassNameButton = (filter: FilteredValuesType) => props.filtered === filter ? 'activeFilter' : ''
    return (
        <div>
            <ul>{taskItems}</ul>
            <div>
                <button className={getClassNameButton('all')}
                    onClick={getOnClickSetFilterHandler('all')}>All</button>
                <button className={getClassNameButton('active')}
                    onClick={getOnClickSetFilterHandler("active")}>Active</button>
                <button className={getClassNameButton('completed')}
                    onClick={getOnClickSetFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    );
};

export default TasksList;