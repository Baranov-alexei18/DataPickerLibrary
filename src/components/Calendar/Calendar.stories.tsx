import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Calendar } from '.';

export default {
  title: 'Components/Calendar',
  component: Calendar,
} as Meta;

const Template: StoryFn = (args) => (
  <Calendar
    isOpen
    startDate={new Date()}
    firstWeekDay={2}
    onDateSelect={() => { }}
    setCurrentDate={() => { }}
    {...args}
  />
);

export const Default = Template.bind({
  startDate: new Date(),
  isOpen: true,
  firstWeekDay: 1,
  onDateSelect: () => { },
  onClose: () => { },
  setCurrentDate: () => { },
});
