import { firstToUppercase } from '../../src/string';

test('Testing firstToUppercase.', () => {
    expect(firstToUppercase('test')).toBe('Test');

    expect(firstToUppercase('')).toBe('');
});
