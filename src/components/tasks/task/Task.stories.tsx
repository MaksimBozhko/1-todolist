import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator, taskId, todoList1} from "../../../stories/ReduxStoreProviderDecorator";

export default {
    title: 'Example/task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {

    },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    id: todoList1,
    taskId: taskId,
    title: 'task'
};

export const TaskNotIsDone = Template.bind({});
TaskNotIsDone.args = {
    id: todoList1,
    taskId: taskId,
    title: 'task'
};