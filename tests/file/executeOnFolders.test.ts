import {
    mkdirSync, existsSync, appendFileSync, rmSync
} from 'fs';

import { executeOnFolders } from '../../src/file';

const createDir = (folderPath: string): void => {
    if (!existsSync(folderPath))
        mkdirSync(folderPath, { recursive: true });
};

test('Testing executeOnFolders.', () => {
    let path = './.temp/executeOnFolders/';

    createDir(`${path}/empty/folder`);

    appendFileSync(`${path}/other.txt`, '');

    path += '/file';
    createDir(path);

    path += '/test.txt';
    appendFileSync(path, '');

    const result = executeOnFolders('./.temp/executeOnFolders/', (localPath, folder) => [localPath, folder]);

    expect(result.length).toBe(1);
    expect(result[0][0]).toBe('./.temp/executeOnFolders');
    expect(result[0][1][0]).toBe('empty');
    expect(result[0][1][1]).toBe('file');
    expect(result[0][1][2]).toBe('other.txt');

    const recursiveResult = executeOnFolders('./.temp/executeOnFolders/', (localPath, folder) => [localPath, folder], { recursive: true });

    rmSync('./.temp/executeOnFolders/', { recursive: true });

    expect(recursiveResult.length).toBe(4);
    expect(recursiveResult[0][0]).toBe('./.temp/executeOnFolders/empty/folder');
    expect(recursiveResult[1][0]).toBe('./.temp/executeOnFolders/empty');
    expect(recursiveResult[1][1][0]).toBe('folder');

    expect(recursiveResult[2][0]).toBe('./.temp/executeOnFolders/file');
    expect(recursiveResult[2][1][0]).toBe('test.txt');

    expect(recursiveResult[3][0]).toBe('./.temp/executeOnFolders');
    expect(recursiveResult[3][1][0]).toBe('empty');
    expect(recursiveResult[3][1][1]).toBe('file');
    expect(recursiveResult[3][1][2]).toBe('other.txt');
});
