export const digitsAfterDecimal = (num) => {
  if (Number.isInteger(num) || isNaN(num)) {
    return 0;
  }

  const arr = num.toString().split(".");

  return arr[1].length;
};
