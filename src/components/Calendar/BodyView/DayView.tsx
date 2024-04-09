import React, { useContext } from 'react';

import { CalendarContext } from '@/components/DatePicker';
import { CalendarContextType, CalendarType } from '@/types/calendar';
import { CalendarDay } from '@/types/calendar/CalendarState';
import { checkDateIsEqual, checkIsToday } from '@/utils/Calendar';
import { getDataFromContext } from '@/utils/getDataFromContext';

import classes from './styles.module.scss';
import { DayViewProps } from './type';

export const DayView: React.FC<DayViewProps> = ({ selectDate, holidays }) => {
  const calendarContext = useContext(CalendarContext);
  const { state, functions } = getDataFromContext(calendarContext) as CalendarType;
  const {
    minDate, maxDate, holiday, holidayColor,
  } = calendarContext as CalendarContextType;

  const isToday = (day: CalendarDay) => checkIsToday(day.date);
  const isSelectedDay = (day: CalendarDay) => checkDateIsEqual(day.date, state.selectedDay.date);
  const isAdditionalDay = (day: CalendarDay) => day.monthIndex !== state.selectedMonth.monthIndex;

  const isDateInRange = (date: Date): boolean => date >= minDate && date <= maxDate;

  const isWeekend = (day: CalendarDay): boolean => {
    const dayOfWeek = day.date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const isHoliday = (date: Date): boolean => {
    if (!holiday) return false;

    const matchingHoliday = holidays.find((holiday) => {
      const holidayDate = new Date(holiday.date);
      return (
        holidayDate.getFullYear() === date.getFullYear()
        && holidayDate.getMonth() === date.getMonth()
        && holidayDate.getDate() === date.getDate()
      );
    });

    return !!matchingHoliday;
  };

  const isViewHoliday = (day: CalendarDay): boolean => {
    const holidayDay = isHoliday(day.date) && !isSelectedDay(day);
    const weekend = isWeekend(day) && !isSelectedDay(day);
    return holiday && (holidayDay || weekend);
  };

  const handleDayClick = (day: CalendarDay) => {
    if (isDateInRange(day.date)) {
      functions.setSelectedDay(day);
      selectDate(day.date);
    }
  };

  return (
    <>
      <div className={classes.week_names}>
        {state.weekDaysNames.map((weekDaysName) => (
          <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
        ))}
      </div>
      <div className={classes.table_days}>
        {state.calendarDays.map((day) => (
          <div
            key={`${day.dayNumber}-${day.monthIndex}`}
            aria-hidden
            onClick={() => handleDayClick(day)}
            className={[
              classes.calendar_day,
              isToday(day) ? classes.calendar_today : '',
              isSelectedDay(day) ? classes.select_day : '',
              isAdditionalDay(day) ? classes.additional_day : '',
              !isDateInRange(day.date) ? classes.disabled_day : '',
            ].join(' ')}
            style={{ backgroundColor: isViewHoliday(day) ? holidayColor : '' }}
          >
            {day.dayNumber}
          </div>
        ))}
      </div>
    </>
  );
};
