import React, { FC } from 'react';

import { ButtonProp } from './type';

import classes from './styles.module.scss';

export const Button:FC<ButtonProp> = ({
  disabled, children, ...rest
}) => (
  <button type="button" className={classes.wrappper} disabled={disabled} {...rest}>
    {children}
  </button>
);
