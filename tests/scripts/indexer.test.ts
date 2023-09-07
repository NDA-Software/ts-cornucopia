import { mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'fs';

import { indexer } from '../../.build/scripts';

const outerResult = '/* AUTO-GENERATED, DO NOT EDIT MANUALLY */\n' +
"import item1 from './item1';\n" +
"import item2 from './item2';\n" +
"import subFolder from './subFolder';\n" +
'\n' +
"export { default as item1 } from './item1';\n" +
"export { default as item2 } from './item2';\n" +
"export { default as subFolder } from './subFolder';\n" +
'\n' +
'export default {\n' +
'    item1,\n' +
'    item2,\n' +
'    subFolder\n' +
'};\n';

const innerResult = '/* AUTO-GENERATED, DO NOT EDIT MANUALLY */' +
'\n' +
'\n' +
'\nexport default {' +
'\n' +
'\n};\n';

test('Testing indexer.', () => {
    const path = './.temp/indexer/';

    mkdirSync(path, { recursive: true });

    writeFileSync(`${path}item1.ts`, '');
    writeFileSync(`${path}item2.ts`, '');

    mkdirSync(`${path}subFolder`, { recursive: true });

    indexer(path);

    expect(existsSync(`${path}subFolder/index.ts`)).toBe(false);

    indexer(path, { recursive: true });

    let result = readFileSync(`${path}index.ts`).toString();

    expect(result).toBe(outerResult);

    result = readFileSync(`${path}subFolder/index.ts`).toString();

    expect(result).toBe(innerResult);

    rmSync(path, { recursive: true });
});
