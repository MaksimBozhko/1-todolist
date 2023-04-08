import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Provider} from "react-redux";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";
import {store} from '../../common/toolkit/store';

export default {
    title: 'Example/EditableSpan',
    component: EditableSpan,
    argTypes: {},
} as ComponentMeta<typeof EditableSpan>;

const callBack = action('value change')

const Template: ComponentStory<typeof EditableSpan> = (args) => <Provider store={store}><EditableSpan {...args} /></Provider>

export const span = Template.bind({});
span.args = {
    callBack,
    title: 'value'
};


