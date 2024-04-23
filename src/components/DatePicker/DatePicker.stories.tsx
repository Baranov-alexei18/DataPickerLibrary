import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { DatePickerProps } from './types';
import { DatePicker } from '.';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    value: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<DatePickerProps> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: '',
  onChange: () => { },
  isFirstWeekDayMonday: true,
  minDate: new Date(2000, 4, 4),
  maxDate: new Date(2024, 10, 11),
  holiday: false,
  holidayColor: '#a0f0a0',
};
