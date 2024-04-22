import React, { ReactNode, useContext } from 'react';

import Next from '@/assets/svg/Next.svg';
import Prev from '@/assets/svg/Prev.svg';
import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarType } from '@/types/calendar';

import Tooltip from '../Tooltip';

import classes from './styles.module.scss';

export const CalendarHeader = () => {
  let labelHeader: ReactNode;

  const { state, functions } = useContext(CalendarContext) as CalendarType;
  const {
    monthesNames,
    selectedYear,
    selectedMonth,
    mode,
    selectedYearsInterval,
  } = state;

  const setMode = (mode: 'days'|'monthes'|'years') => () => functions.setMode(mode);

  const handleArrow = (arrow: 'left' | 'right') => () => functions.onClickArrow(arrow);

  switch (mode) {
    case 'days': {
      labelHeader = (
        <div data-testid="days-view" aria-hidden onClick={setMode('monthes')}>
          {monthesNames[selectedMonth.monthIndex].month}
          {' '}
          {selectedYear}
          <Tooltip />
        </div>
      );
      break;
    }
    case 'monthes': {
      labelHeader = (
        <div data-testid="monthes-view" aria-hidden onClick={setMode('years')}>
          {selectedYear}
        </div>
      );
      break;
    }
    case 'years': {
      labelHeader = (
        <div data-testid="years-view">
          {selectedYearsInterval[0]}
          -
          {selectedYearsInterval[selectedYearsInterval.length - 1]}
        </div>
      );
      break;
    }
    default: {
      labelHeader = null;
      break;
    }
  }

  return (
    <div data-testid="calendar-header" className={classes.wrapper}>
      <img
        src={Prev}
        alt="toLeft"
        title="Prev"
        onClick={handleArrow('left')}
        aria-hidden
      />
      <span>
        {labelHeader}
      </span>
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
