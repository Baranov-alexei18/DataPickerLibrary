import React, { ComponentType } from 'react';

import { Calendar } from '@/components/Calendar';
import { CalendarServiceType } from '@/components/Calendar/type';
import { withCalendarContext } from '@/hoc/withCalendarContext';
import { withHolidaysConditional } from '@/hoc/withHoliday';
import { withToDoList } from '@/hoc/withTodoList';
import { DayViewProps } from '@/types';

class CalendarService {
  createCalendar(config: CalendarServiceType): React.ReactNode {
    let WrappedCalendar = withCalendarContext(Calendar);

    if (config.holiday) {
      WrappedCalendar = withHolidaysConditional(WrappedCalendar as ComponentType<DayViewProps>);
    }

    return withToDoList(WrappedCalendar)(config);
  }
}

export default new CalendarService();
