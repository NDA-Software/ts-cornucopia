import { cammelToSpace } from '../../.build/string';

test('Testing cammelToSpace.', () => {
    expect(cammelToSpace('manyWordsTest')).toBe('Many Words Test');

    expect(cammelToSpace('')).toBe('');

    expect(cammelToSpace('manyWordsTest', '_')).toBe('Many_Words_Test');
});
