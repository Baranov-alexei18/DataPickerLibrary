import React, { ReactNode, useCallback, useContext } from 'react';

import Next from '@/assets/svg/Next.svg';
import Prev from '@/assets/svg/Prev.svg';
import { CalendarContext } from '@/hoc/withCalendarContext';
import { CalendarType } from '@/types/calendar';
import { getDataFromContext } from '@/utils/getDataFromContext';

import classes from './styles.module.scss';

export const CalendarHeader = () => {
  let labelHeader: ReactNode;
  const calendarContext = useContext(CalendarContext);
  const { state, functions } = getDataFromContext(calendarContext) as CalendarType;

  const setMode = (mode: 'days'|'monthes'|'years') => () => functions.setMode(mode);

  const handleArrow = (arrow: 'left' | 'right') => useCallback(() => functions.onClickArrow(arrow), [functions.onClickArrow]);

  switch (state.mode) {
    case 'days': {
      labelHeader = (
        <div aria-hidden onClick={setMode('monthes')}>
          {state.monthesNames[state.selectedMonth.monthIndex].month}
          {' '}
          {state.selectedYear}
        </div>
      );
      break;
    }
    case 'monthes': {
      labelHeader = (
        <div aria-hidden onClick={setMode('years')}>
          {state.selectedYear}
        </div>
      );
      break;
    }
    case 'years': {
      labelHeader = (
        <div>
          {state.selectedYearsInterval[0]}
          -
          {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
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
    <div className={classes.wrapper}>
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
