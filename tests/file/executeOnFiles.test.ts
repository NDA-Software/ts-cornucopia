import {
    mkdirSync, existsSync, appendFileSync, rmSync
} from 'fs';

import { executeOnFiles } from '../../src/file';

const createDir = (folderPath: string): void => {
    if (!existsSync(folderPath))
        mkdirSync(folderPath, { recursive: true });
};

test('Testing executeOnFiles.', () => {
    const path = './.temp/executeOnFiles';

    createDir(`${path}/empty/folder`);

    appendFileSync(`${path}/other.txt`, '');
    appendFileSync(`${path}/fileToBeIgnored.txt`, '');

    createDir(`${path}/file`);
    appendFileSync(`${path}/file/test.txt`, '');

    const ignoredFiles = 'fileToBeIgnored.txt';

    const result = executeOnFiles('./.temp/executeOnFiles/', (filePath) => filePath, { ignoredFiles });
    const recursiveResult = executeOnFiles('./.temp/executeOnFiles/', (filePath) => filePath, { recursive: true, ignoredFiles });
    const withoutSkipResult = executeOnFiles('./.temp/executeOnFiles/', (filePath) => filePath, { skipFolders: false, ignoredFiles });

    rmSync('./.temp/executeOnFiles/', { recursive: true });

    expect(result.length).toBe(1);
    expect(result[0]).toBe('./.temp/executeOnFiles/other.txt');

    expect(recursiveResult.length).toBe(2);
    expect(recursiveResult[0]).toBe('./.temp/executeOnFiles/file/test.txt');
    expect(recursiveResult[1]).toBe('./.temp/executeOnFiles/other.txt');

    expect(withoutSkipResult[0]).toBe('./.temp/executeOnFiles/empty');
    expect(withoutSkipResult[1]).toBe('./.temp/executeOnFiles/file');
    expect(withoutSkipResult[2]).toBe('./.temp/executeOnFiles/other.txt');
});
