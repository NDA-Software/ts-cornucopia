import {
    mkdirSync, existsSync, appendFileSync, rmSync
} from 'fs';

import { executeOnFiles } from '../../src/file';

const createDir = (folderPath: string): void => {
    if (!existsSync(folderPath))
        mkdirSync(folderPath, { recursive: true });
};

test('Testing executeOnFiles.', () => {
    let path = './.temp/executeOnFiles';

    createDir(`${path}/empty/folder`);

    appendFileSync(`${path}/other.txt`, '');

    path += '/file';
    createDir(path);

    path += '/test.txt';
    appendFileSync(path, '');

    const result = executeOnFiles('./.temp/executeOnFiles/', (filePath) => filePath);
    const recursiveResult = executeOnFiles('./.temp/executeOnFiles/', (filePath) => filePath, { recursive: true });
    const withoutSkipResult = executeOnFiles('./.temp/executeOnFiles/', (filePath) => filePath, { skipFolders: false });

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
