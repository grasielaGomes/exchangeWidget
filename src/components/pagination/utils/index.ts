export const getNumbers = (number: number): string[] => {
  const array = [];
  for (let i = 1; i <= number; i++) {
    array.push(String(i));
  }
  return array;
};
