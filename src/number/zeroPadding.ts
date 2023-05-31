const zeroPadding = (value: number | string, quantity = 1) => {
  if (value == null || value === undefined)
    value = '';

  value = value.toString();

  while (value.length < quantity)
    value = `0${value}`;

  return value;
};

export default zeroPadding;
