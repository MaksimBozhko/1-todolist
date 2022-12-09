import React from 'react';
import {TaskType} from "./Todolist";
import Task from "./Task";

type TasksListTypeProps = {
    tasks: Array<TaskType>
}

const TasksList = (props: TasksListTypeProps) => {
    return (
        <div>
            <ul>
                {props.tasks.map(el => <Task id={el.id} title={el.title} isDone={el.isDone} />)}
                {/*<Task id={props.tasks[0].id} title={props.tasks[0].title} isDone={props.tasks[0].isDone}/>
                <Task id={props.tasks[1].id} title={props.tasks[1].title} isDone={props.tasks[1].isDone}/>
                <Task id={props.tasks[2].id} title={props.tasks[2].title} isDone={props.tasks[2].isDone}/>*/}
                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/>{props.tasks[0].title}</li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/>{props.tasks[1].title}</li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/>{props.tasks[2].title}</li>*/}
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