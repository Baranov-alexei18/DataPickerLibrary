export const isDateInRange = (date: Date, max: Date, min: Date, strict: boolean = false) => {
  if (!min || !max) return false;

  if (strict) {
    return date > min && date < max;
  }
  const isDayInRange = date >= min && date <= max;
  return isDayInRange;
};
