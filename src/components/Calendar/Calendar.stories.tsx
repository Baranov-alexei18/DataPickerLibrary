import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Calendar } from '.';

export default {
  title: 'Components/Calendar',
  component: Calendar,
} as Meta;

const Template: StoryFn = (args) => (
  <Calendar
    isOpen={false}
    startDate=""
    firstWeekDay={undefined}
    onDateSelect={() => { }}
    setCurrentDate={() => { }}
    {...args}
  />
);

export const Default = Template.bind({
  startDate: new Date(),
  isOpen: true,
  firstWeekDay: 'Mo',
  onDateSelect: () => { },
  onClose: () => { },
  setCurrentDate: () => { },
});
