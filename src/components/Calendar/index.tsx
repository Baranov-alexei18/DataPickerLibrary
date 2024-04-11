import React, { memo, useContext } from 'react';

import { CalendarContext } from '@/hoc/withCalendarContext';
import { withHolidaysConditional } from '@/hoc/withHoliday';
import { withToDoList } from '@/hoc/withTodoList';
import { CalendarContextType } from '@/types/calendar';

import { Button } from '../Button';
import { DayView } from '../DayView';
import { MonthView } from '../MonthView';
import { YearView } from '../YearView';
import { CalendarHeader } from './Header';
import classes from './styles.module.scss';
import { CalendarProps } from './type';

const Calendar: React.FC<Partial<CalendarProps>> = memo(({
  isOpen,
  selectedRange,
  clearDate,
  selectDate,
  selectRange,
  openTodo,
}: Partial<CalendarProps>) => {
  const calendarContext = useContext(CalendarContext);

  const { state, holiday } = calendarContext as CalendarContextType;

  if (!isOpen) return null;

  const DayViewWithHolidays = withHolidaysConditional(DayView, state.selectedYear, holiday);

  const selectedDate = (date: Date | Date[]) => {
    if (selectDate) {
      selectDate(date as Date);
    } else if (selectRange) {
      selectRange(date as Date);
    }
  };

  let bodyView;
  switch (state.mode) {
    case 'days': {
      bodyView = (
        <DayViewWithHolidays
          selectDate={selectedDate}
          selectedRange={selectedRange}
          openTodo={openTodo}
        />
      );
      break;
    }
    case 'monthes': {
      bodyView = <MonthView />;
      break;
    }
    case 'years': {
      bodyView = <YearView />;
      break;
    }
    default: {
      bodyView = null;
      break;
    }
  }

  return (
    <div className={classes.calendar} aria-hidden>
      <CalendarHeader />
      {bodyView}
      <Button onClick={clearDate}>Clear</Button>
    </div>

  );
});

export default withToDoList(Calendar);
