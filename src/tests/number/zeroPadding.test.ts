import { zeroPadding } from '../../number';

test('Testing zeroPadding.', () => {
  expect(zeroPadding(10, 3)).toBe('010');

  expect(zeroPadding('10', 3)).toBe('010');

  expect(zeroPadding(10)).toBe('10');

  expect(zeroPadding(10, 2)).toBe('10');

  expect(zeroPadding(10, 10)).toBe('0000000010');
});
