import { readFileSync, existsSync } from 'fs';

import executeOnFolder from '../helpers/executeOnFolder';

// This file checks if each file has a corresponding test and doc files.
// To force future implementations to all have at least some testing and documentation.

const checkFiles = (
  folder: string,
  destinyFolder: string,
  finalSufix: string,
  done: jest.DoneCallback,
) => {
  const errors = executeOnFolder(folder, (filePath) => {
    if (filePath.includes('./src/tests/'))
      return null;

    filePath = `${destinyFolder}/${filePath.substring(6, filePath.length - 3)}.${finalSufix}`;

    if (!existsSync(filePath))
      return `Missing file: '${filePath}'.`;

    return null;
  }).filter((item) => item !== null);

  if (errors.length > 0)
    return done(errors);

  return done();
};

test('Checking test files...', (done) => checkFiles('./src', './src/tests', 'test.ts', done));

test('Checking doc files...', (done) => checkFiles('./src', './docs', 'md', done));

test('Looking for mentions of each file...', (done) => {
  const readMe = readFileSync('./readme.md').toString();

  const errors = executeOnFolder('./src', (filePath) => {
    if (filePath.includes('./src/tests/'))
      return null;

    const lastFolder = filePath.lastIndexOf('/') + 1;
    const extensionPoint = filePath.lastIndexOf('.');

    const fileName = filePath.substring(lastFolder, extensionPoint);

    if (fileName === 'index')
      return null;

    const filePathCheck = `- [${fileName}](docs/${filePath.substring(6, extensionPoint)}.md)`;

    if (!readMe.includes(filePathCheck))
      return `Missing mention of '${filePathCheck}' in readme.md.`;

    return null;
  }).filter((item) => item !== null);

  if (errors.length > 0)
    return done(errors);

  return done();
});
