export const getArrayOfEveryIntegerBetween = (num1: number, num2: number, order: 'asc' | 'desc') => {
  const high = Math.max(num1, num2);
  const low = Math.min(num1, num2);
  return order === 'asc'
    ? new Array(high - low + 1).fill(null).map((_, index) => low + index)
    : new Array(high - low + 1).fill(null).map((_, index) => high - index);
};

type SelectedDate = { year: string; month: string; day: string };

export const convertToDottedFormat = (data: SelectedDate) => {
  if (!data.year) return;
  let month = '',
    day = '';
  if (data.month) month = data.month.length < 2 ? '0' + data.month : data.month;
  if (data.day) day = data.day.length < 2 ? '0' + data.day : data.day;
  return `${data.year}.${month && month + '.'}${day}`;
};

export const phoneFormat = (phone: string) => {
  return phone.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
};
