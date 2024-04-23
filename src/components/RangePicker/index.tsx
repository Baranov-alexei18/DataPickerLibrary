import React, { useCallback, useState } from 'react';

import CalendarService from '@/services/serviceCalendar';
import { formatDateToString } from '@/utils/Calendar/getFormatDate';

import { CalendarServiceType } from '../Calendar/types';
import { DateField } from '../DateField';
import { DatePickerProps } from '../DatePicker/types';

import classes from './styles.module.scss';

export const RangePicker: React.FC<Partial<DatePickerProps>> = (
  {
    minDate = new Date(2000, 1, 1),
    maxDate = new Date(2200, 1, 1),
    isFirstWeekDayMonday = true,
    holiday = false,
    holidayColor = 'inherit',
    onChange,
  },
) => {
  const [selectedRange, setSelectedRange] = useState<[Date | null, Date | null]>([null, null]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSelectRange = (date: Date) => {
    const startRange = selectedRange[0];
    const endRange = selectedRange[1];

    if (!startRange) {
      setSelectedRange([date, null]);
      return;
    }

    if (!endRange && date > startRange) {
      setSelectedRange([startRange, date]);
      onChange!(`${formatDateToString(selectedRange[0]!)} - ${formatDateToString(date)}`);
    } else if (!endRange && date < startRange) {
      setSelectedRange([date, startRange]);
      onChange!(`${formatDateToString(date!)} - ${formatDateToString(startRange!)}`);
    } else {
      setSelectedRange([date, null]);
    }
  };

  const handleClearRange = useCallback(() => {
    setSelectedRange([null, null]);
  }, []);

  const handleInputClick = useCallback(() => {
    setIsCalendarOpen(true);
  }, []);

  const closeCalendar = useCallback(() => {
    setIsCalendarOpen(false);
  }, []);

  const configCalendar:CalendarServiceType = {
    isOpen: isCalendarOpen,
    selectedRange,
    selectRange: (selectedDate: Date) => {
      handleSelectRange(selectedDate);
    },
    clearDate: () => handleClearRange(),
    isFirstWeekDayMonday,
    holiday,
    holidayColor,
    minDate,
    maxDate,
  };

  return (
    <div className={classes.wrapper}>
      <p>
        From
      </p>
      <DateField
        value={selectedRange[0] ? formatDateToString(selectedRange[0]) : ''}
        onClear={handleClearRange}
        onFocus={handleInputClick}
        closeCalendar={closeCalendar}
      />
      <p>
        To
      </p>
      <DateField
        value={selectedRange[1] ? formatDateToString(selectedRange[1]) : ''}
        onClear={handleClearRange}
        onFocus={handleInputClick}
        closeCalendar={closeCalendar}
      />
      {CalendarService.createCalendar(configCalendar)}
    </div>
  );
};
