import React from 'react';
import {TaskType} from "./Todolist";
import Task from "./Task";

type TasksListType = {
    tasks: Array<TaskType>
}

const TasksList = (props: TasksListType) => {
    return (
        <div>
            <ul>
                {props.tasks.map(el => <Task title={el.title} isDone={el.isDone}/>)}
                {/*<Task  title={props.tasks[0].title} isDone={props.tasks[0].isDone}/>
                <Task  title={props.tasks[1].title} isDone={props.tasks[1].isDone}/>
                <Task  title={props.tasks[2].title} isDone={props.tasks[2].isDone}/>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TasksList;