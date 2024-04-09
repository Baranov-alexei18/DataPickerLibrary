import React, { ReactNode, useContext } from 'react';

import Next from '@/assets/svg/Next.svg';
import Prev from '@/assets/svg/Prev.svg';
import { CalendarContext } from '@/components/DatePicker';
import { CalendarType } from '@/types/calendar';
import { getDataFromContext } from '@/utils/getDataFromContext';

import classes from './styles.module.scss';

export const CalendarHeader = () => {
  const calendarContext = useContext(CalendarContext);

  const { state, functions } = getDataFromContext(calendarContext) as CalendarType;

  let labelHeader: ReactNode;

  switch (state.mode) {
    case 'days': {
      labelHeader = (
        <div aria-hidden onClick={() => functions.setMode('monthes')}>
          {state.monthesNames[state.selectedMonth.monthIndex].month}
          {' '}
          {state.selectedYear}
        </div>
      );
      break;
    }
    case 'monthes': {
      labelHeader = (
        <div aria-hidden onClick={() => functions.setMode('years')}>
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
        onClick={() => functions.onClickArrow('left')}
        aria-hidden
      />
      <span>
        {labelHeader}
      </span>
      <img
        src={Next}
        alt="toRight"
        title="Next"
        onClick={() => functions.onClickArrow('right')}
        aria-hidden
      />
    </div>
  );
};
