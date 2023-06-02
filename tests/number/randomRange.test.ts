import { randomRange } from '../../src/number';

test('Testing randomRange.', () => {
  let smallerResult = 9999;
  let biggerResult = 0;

  for (let i = 0; i < 1000; i++) {
    const rand = randomRange(0, 50);

    if (smallerResult > rand)
      smallerResult = rand;

    if (biggerResult < rand)
      biggerResult = rand;
  }

  expect(smallerResult).toBe(0);
  expect(biggerResult).toBe(50);
});
