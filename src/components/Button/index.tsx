import React, { ReactNode } from 'react';

import classes from './styles.module.scss';

interface ButtonProp {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode
}
export type ButtonProps = Partial<ButtonProp>;

export const Button:React.FC<ButtonProps> = ({
  disabled, children, ...rest
}) => (
  <button type="button" className={classes.Button} disabled={disabled} {...rest}>
    {children}
  </button>
);
