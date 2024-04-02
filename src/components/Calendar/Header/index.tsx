import React, { FC } from 'react';

import Next from '@/assets/svg/Next.svg';
import Prev from '@/assets/svg/Prev.svg';
import { months } from '@/constants';

import classes from './styles.module.scss';

interface HeaderCalendarProps {
    currentDate: Date;
    onPrevMonthClick: () => void;
    onNextMonthClick: () => void;
}
export const CalendarHeader: FC<HeaderCalendarProps> = (
  { currentDate, onPrevMonthClick, onNextMonthClick },
) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const handlePrevMonthClick = () => {
    onPrevMonthClick();
  };

  const handleNextMonthClick = () => {
    onNextMonthClick();
  };

  return (
    <div className={classes.wrapper}>
      <img
        src={Prev}
        alt="Close"
        onClick={handlePrevMonthClick}
        aria-hidden
      />
      <span className={classes.info}>
        {months[currentMonth]}
        {' '}
        {currentYear}
      </span>
      <img
        src={Next}
        alt="Close"
        onClick={handleNextMonthClick}
        aria-hidden
      />
    </div>
  );
};
