import React, { FC } from 'react';

import classes from './styles.module.scss';
import { ButtonProp } from './type';

export const Button:FC<ButtonProp> = ({
  disabled, children, ...rest
}) => (
  <button type="button" className={classes.wrappper} disabled={disabled} {...rest}>
    {children}
  </button>
);
