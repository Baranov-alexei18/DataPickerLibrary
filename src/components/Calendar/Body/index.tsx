import React, { useContext } from 'react';

import { CalendarContext } from '@/components/DatePicker';
import { withHolidaysConditional } from '@/hoc/withHoliday';
import { CalendarContextType } from '@/types/calendar';

import { DayView } from '../BodyView/DayView';
import { WeekView } from '../BodyView/WeekView';
import { YearView } from '../BodyView/YearView';
import { CalendarBodyType } from './type';

export const CalendarBody = React.memo(({ mode, selectDate }: CalendarBodyType) => {
  const { holiday, state } = useContext(CalendarContext) as CalendarContextType;

  const DayViewWithHolidays = withHolidaysConditional(DayView, state.selectedYear, holiday);

  let bodyView;
  switch (mode) {
    case 'days': {
      bodyView = <DayViewWithHolidays selectDate={(date: Date) => selectDate(date)} />;
      break;
    }
    case 'monthes': {
      bodyView = <WeekView />;
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
    <div className="calendar__body">
      {bodyView}
    </div>
  );
});
