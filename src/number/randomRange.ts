const randomRange = (min: number, max: number) => {
  const result = Math.random() * (max - min) + min;

  return Math.round(result);
};

export default randomRange;
