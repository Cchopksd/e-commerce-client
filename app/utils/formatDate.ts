import { format } from 'date-fns';

export const formatDate = (date: Date): string => {
  const year = date.getFullYear() + 543;
  return format(date, `dd-MM-${year}`);
};
