import React from 'react';
import {TaskType} from "./Todolist";

type TasksListTypeProps = {
    tasks: Array<TaskType>
}

const TasksList = (props: TasksListTypeProps) => {
    return (
        <div>
            <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/>{props.tasks[0].title}</li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/>{props.tasks[1].title}</li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/>{props.tasks[2].title}</li>
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