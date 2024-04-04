import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { DatePicker, DatePickerProps } from '.';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    value: { control: 'text' },
    firstWeekDay: {
      options: ['Mo', 'Su'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const Template: StoryFn<DatePickerProps> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: '',
  onChange: () => { },
  firstWeekDay: 'Su',
};
