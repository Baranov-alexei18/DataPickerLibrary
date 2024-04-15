import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { RangePicker } from '.';

export default {
  title: 'Components/RangePicker',
  component: RangePicker,
} as Meta;

const Template: StoryFn = (args) => <RangePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: '',
  onChange: (value: string) => console.log('Selected value:', value),
  isFirstWeekDayMonday: true,
  maxDate: new Date(2024, 10, 11),
  minDate: new Date(2000, 4, 4),
  holiday: false,
  holidayColor: '#a0f0a0',
};
