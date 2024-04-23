import React, { useContext } from 'react';

import Next from '@/assets/image/icons/Next.svg';
import Prev from '@/assets/image/icons/Prev.svg';
import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarType } from '@/types/calendar';

import { LabelHeader } from '../LabelHeader';

import classes from './styles.module.scss';

export const CalendarHeader = () => {
  const { functions } = useContext(CalendarContext) as CalendarType;

  const handleArrow = (arrow: 'left' | 'right') => () => functions.onClickArrow(arrow);

  return (
    <div data-testid="calendar-header" className={classes.wrapper}>
      <img
        src={Prev}
        alt="toLeft"
        title="Prev"
        onClick={handleArrow('left')}
        aria-hidden
      />
      <LabelHeader />
      <img
        src={Next}
        alt="toRight"
        title="Next"
        onClick={handleArrow('right')}
        aria-hidden
      />
    </div>
  );
};
