import { readFileSync, readdirSync } from 'fs';

const rootPath = './src';
const helpersPath = `${rootPath}/helpers`;

// Testing if all helper files are imported and exported in index.ts.

test('Checking index.ts consistensy.', (done) => {
  const indexFile = readFileSync(`${rootPath}/index.ts`).toString();

  const errors = [];

  for (const tsFile of readdirSync(helpersPath)) {
    const fileName = tsFile.substring(0, tsFile.length - 3);

    if (!indexFile.includes(`export { default as ${fileName} } from './helpers/${fileName}';`))
      errors.push(`Missing "${helpersPath}/${tsFile}" import and export in index.ts.`);
  }

  if (errors.length > 0)
    return done(errors);

  return done();
});
