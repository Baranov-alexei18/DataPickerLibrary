import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Calendar } from '.';

export default {
  title: 'Components/Calendar',
  component: Calendar,
} as Meta;

const Template: StoryFn = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {
  startDate: new Date(),
};
