import React, { useState } from 'react';

import { Calendar } from '@/components/Calendar';

// import { RangePicker } from './RangePicker';

const withCalendarWrapper = (WrappedComponent: any) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (value: React.SetStateAction<null>) => {
    setSelected(value);
  };

  return (
    <div>
      <WrappedComponent selected={selected} onSelect={handleSelect} />
    </div>
  );
};

const SimpleCalendarWrapper = withCalendarWrapper(Calendar);

// const RangePickerWrapper = withCalendarWrapper(RangePicker);

export { SimpleCalendarWrapper };
