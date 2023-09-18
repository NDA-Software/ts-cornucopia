import { mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from 'fs';

import { indexer } from '../../.build/scripts';

const outerResult = '/* AUTO-GENERATED, DO NOT EDIT MANUALLY */\n' +
"import item1 from './item1';\n" +
"import item2 from './item2';\n" +
"import subFolder from './subFolder';\n" +
'\n' +
'export { item1 };\n' +
'export { item2 };\n' +
'export { subFolder };\n' +
'\n' +
'export default {\n' +
'    item1,\n' +
'    item2,\n' +
'    subFolder\n' +
'};\n';

const namedResult = '/* AUTO-GENERATED, DO NOT EDIT MANUALLY */\n' +
"import * as item1 from './item1';\n" +
"import * as item2 from './item2';\n" +
"import * as subFolder from './subFolder';\n" +
'\n' +
"export * from './item1';\n" +
"export * from './item2';\n" +
"export * from './subFolder';\n" +
'\n' +
'export default {\n' +
'    ...item1,\n' +
'    ...item2,\n' +
'    ...subFolder\n' +
'};\n';

const mixedResult = '/* AUTO-GENERATED, DO NOT EDIT MANUALLY */\n' +
"import item1, * as item1Named from './item1';\n" +
"import item2, * as item2Named from './item2';\n" +
"import subFolder, * as subFolderNamed from './subFolder';\n" +
'\n' +
'export { item1 };\n' +
'export { item2 };\n' +
'export { subFolder };\n' +
'\n' +
"export * from './item1';\n" +
"export * from './item2';\n" +
"export * from './subFolder';\n" +
'\n' +
'export default {\n' +
'    item1,\n' +
'    item2,\n' +
'    subFolder,\n' +
'    ...item1Named,\n' +
'    ...item2Named,\n' +
'    ...subFolderNamed\n' +
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

    try {
        indexer(path);

        expect(existsSync(`${path}subFolder/index.ts`)).toBe(false);

        indexer(path, { recursive: true, exportMode: 'default' });

        let result = readFileSync(`${path}index.ts`).toString();

        expect(result).toBe(outerResult);

        result = readFileSync(`${path}subFolder/index.ts`).toString();

        expect(result).toBe(innerResult);

        indexer(path, { exportMode: 'named' });

        result = readFileSync(`${path}index.ts`).toString();

        expect(result).toBe(namedResult);

        indexer(path, { exportMode: 'mixed' });

        result = readFileSync(`${path}index.ts`).toString();

        expect(result).toBe(mixedResult);
    } finally {
        rmSync(path, { recursive: true });
    }
});
