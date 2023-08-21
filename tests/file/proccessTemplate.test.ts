import { writeFileSync, existsSync, mkdirSync } from 'fs';

import { proccessTemplate } from '../../src/file';

test('Testing proccessTemplate.', () => {
  let path = './.temp';
  if (!existsSync(path))
    mkdirSync(path);

  path += '/templateTest.txt';
  writeFileSync(path, 'Hello {{NAME}}!');

  const result = proccessTemplate(path, { name: 'there' });

  expect(result).toBe('Hello there!');
});
