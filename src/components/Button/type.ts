import { ReactNode } from 'react';

export type ButtonProp = {
    onClick: () => void;
    disabled?: boolean;
    children: ReactNode
  }
