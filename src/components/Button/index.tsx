import React, { FC, memo } from 'react';

import { ButtonProp } from './types';

import classes from './styles.module.scss';

export const Button:FC<ButtonProp> = memo(({
  disabled, children, ...rest
}:ButtonProp) => (
  <button type="button" className={classes.wrappper} disabled={disabled} {...rest}>
    {children}
  </button>
));
