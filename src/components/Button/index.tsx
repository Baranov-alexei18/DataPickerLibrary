import React, { ReactNode } from 'react';

import * as styles from './styles.module.scss';

interface ButtonProp {
  onClick: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary';
  children: ReactNode
}
export type ButtonProps = Partial<ButtonProp>;

export const Button:React.FC<ButtonProps> = ({
  variant, size, disabled, children, ...rest
}) => {
  const classNames = `${styles.Button} ${variant} ${size} ${disabled ? `${styles.disabled}` : ''}`;

  return (
    <button type="button" className={classNames} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
