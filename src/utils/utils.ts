export const getArrayOfEveryIntegerBetween = (num1: number, num2: number, order: 'asc' | 'desc') => {
  const high = Math.max(num1, num2);
  const low = Math.min(num1, num2);
  return order === 'asc'
    ? new Array(high - low + 1).fill(null).map((_, index) => low + index)
    : new Array(high - low + 1).fill(null).map((_, index) => high - index);
};
