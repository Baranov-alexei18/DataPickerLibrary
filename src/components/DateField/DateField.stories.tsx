import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { DateField, DateFieldProps } from '.';

export default {
  title: 'Components/DateField',
  component: DateField,
  argTypes: {
    value: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<DateFieldProps> = (args) => <DateField {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: '',
  onChange: (value: string) => console.log(value),
};