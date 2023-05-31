const defaultOptions = {
  thousandSeparator: ',',
  decimalSeparator: '.',
  decimalPlaces: 2,
};

type Options = {
  thousandSeparator?: string,
  decimalSeparator?: string,
  decimalPlaces?: number,
};

const numberFormat = (amount: number, options : Options = {}) => {
  const { thousandSeparator, decimalSeparator, decimalPlaces } = { ...defaultOptions, ...options };

  const amountWithDecimals = amount.toFixed(decimalPlaces);

  let integer = amountWithDecimals;
  let decimal = '';
  if (decimalPlaces !== undefined && decimalPlaces > 0) {
    const amountArray = amountWithDecimals.split('.');

    if (amountArray[0] !== undefined && amountArray[1] !== undefined)
      [integer, decimal] = amountArray;
  }

  let result = '';

  while (integer !== undefined && integer.length > 3) {
    const newLength = integer.length - 3;

    result += thousandSeparator + integer.slice(newLength);

    integer = integer.slice(0, newLength);
  }

  result = integer + result;

  if (decimalPlaces !== undefined && decimalPlaces > 0)
    result += decimalSeparator + decimal;

  return result;
};

export default numberFormat;
