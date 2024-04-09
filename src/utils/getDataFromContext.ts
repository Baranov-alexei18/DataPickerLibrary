export const getDataFromContext = (calendarContext:unknown) => {
  if (!calendarContext) {
    throw new Error('Calendar context is null');
  }

  return calendarContext;
};
