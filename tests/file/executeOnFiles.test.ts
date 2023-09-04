import {
    mkdirSync, existsSync, appendFileSync, rmSync
} from 'fs';

import { executeOnFiles } from '../../.build/file';

const createDir = (folderPath: string): void => {
    if (!existsSync(folderPath))
        mkdirSync(folderPath, { recursive: true });
};

test('Testing executeOnFiles.', () => {
    let path = './.temp/path/to';

    createDir(path);

    appendFileSync(`${path}/other.txt`, '');

    createDir(`${path}/empty`);
    createDir(`${path}/empty/folder`);

    path += '/file';
    createDir(path);

    path += '/test.txt';
    appendFileSync(path, '');

    const result = executeOnFiles('./.temp/path/', (filePath) => filePath);

    rmSync('./.temp/path/', { recursive: true });

    expect(result.length).toBe(2);
    expect(result[0]).toBe('./.temp/path/to/file/test.txt');
    expect(result[1]).toBe('./.temp/path/to/other.txt');
});
