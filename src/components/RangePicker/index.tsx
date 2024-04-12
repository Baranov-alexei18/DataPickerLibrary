import React, { useCallback, useState } from 'react';

import { withCalendarContext } from '@/hoc/withCalendarContext';
import { formatDateToString } from '@/utils/Calendar/getFormatDate';

import Calendar from '../Calendar';
import { DateField } from '../DateField';
import { DatePickerProps } from '../DatePicker/type';
import classes from './styles.module.scss';

const RangePicker: React.FC<Partial<DatePickerProps>> = () => {
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
    } else if (!endRange && date < startRange) {
      setSelectedRange([date, startRange]);
    } else {
      setSelectedRange([date, null]);
    }
  };

  const handleClearRange = () => {
    setSelectedRange([null, null]);
    closeCalendar();
  };

  const handleInputClick = useCallback(() => {
    setIsCalendarOpen(true);
  }, []);

  const closeCalendar = useCallback(() => {
    setIsCalendarOpen(false);
  }, []);

  return (
    <div className={classes.wrapper}>
      <p>
        From
      </p>
      <DateField
        value={selectedRange[0] ? formatDateToString(selectedRange[0]) : ''}
        onClear={handleClearRange}
        onFocus={handleInputClick}
        closeCalendar={() => setIsCalendarOpen(false)}
      />
      <p>
        To
      </p>
      <DateField
        value={selectedRange[1] ? formatDateToString(selectedRange[1]) : ''}
        onClear={handleClearRange}
        onFocus={handleInputClick}
        closeCalendar={() => setIsCalendarOpen(false)}
      />
      <Calendar
        isOpen={isCalendarOpen}
        selectedRange={selectedRange}
        selectRange={handleSelectRange}
        clearDate={handleClearRange}
      />
    </div>
  );
};
export default withCalendarContext(RangePicker);
