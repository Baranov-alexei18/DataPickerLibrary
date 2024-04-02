import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Button, ButtonProps } from '.';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: StoryFn<ButtonProps> = (args: ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  size: 'medium',
  children: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  size: 'medium',
  children: 'Secondary Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: 'primary',
  size: 'medium',
  disabled: true,
  children: 'Disabled Button',
};
