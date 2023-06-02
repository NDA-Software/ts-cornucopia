import { existsSync, writeFileSync } from 'fs';

import { executeOnFiles, proccessTemplate } from '../src/file';

const testPath = './tests';

executeOnFiles('./src', (filePath) => {
  if (filePath.includes('index.ts'))
    return null;

  const partialFilePath = filePath.substring(5, filePath.length - 3);

  const domain = partialFilePath.substring(1, partialFilePath.lastIndexOf('/'));
  const fileName = partialFilePath.substring(partialFilePath.lastIndexOf('/') + 1);

  const testFile = `${testPath}${partialFilePath}.test.ts`;
  if (!existsSync(testFile)) {
    const testContent = proccessTemplate('./scripts/templates/baseTestFile.txt', { fileName, domain });

    writeFileSync(testFile, testContent);
  }

  return true;
});
