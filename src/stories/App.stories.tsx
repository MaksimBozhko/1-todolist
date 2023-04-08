import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {App} from '../App';

export default {
    title: 'Example/App',
    component: App,
    argTypes: {},
    // decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = () => <App/>;

export const Primary = Template.bind({});
