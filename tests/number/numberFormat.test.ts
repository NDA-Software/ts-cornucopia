import { numberFormat } from '../../.build/number';

test('Testing numberFormat.', () => {
    expect(numberFormat(0)).toBe('0.00');
    expect(numberFormat(1)).toBe('1.00');
    expect(numberFormat(10)).toBe('10.00');
    expect(numberFormat(100)).toBe('100.00');
    expect(numberFormat(1000)).toBe('1,000.00');
    expect(numberFormat(10000)).toBe('10,000.00');
    expect(numberFormat(100000)).toBe('100,000.00');
    expect(numberFormat(1000000)).toBe('1,000,000.00');
    expect(numberFormat(10000000)).toBe('10,000,000.00');

    expect(numberFormat(1000.05)).toBe('1,000.05');

    expect(numberFormat(1000.1965, { decimalPlaces: 3 })).toBe('1,000.197');

    expect(numberFormat(1000.05, { thousandSeparator: '/', decimalSeparator: '-' })).toBe('1/000-05');
});
