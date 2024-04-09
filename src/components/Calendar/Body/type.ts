import { ModeCalendar } from '@/types/calendar/CalendarState';

export type CalendarBodyType = {
    mode: ModeCalendar,
    selectDate: (date: Date)=>void
  }
