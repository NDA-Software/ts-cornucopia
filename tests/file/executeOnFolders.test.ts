import {
  mkdirSync, existsSync, appendFileSync, rmSync,
} from 'fs';

import { executeOnFolders } from '../../src/file';

const createDir = (folderPath: string) => {
  if (!existsSync(folderPath))
    mkdirSync(folderPath);
};

test('Testing executeOnFolders.', () => {
  let path = './.temp';
  createDir(path);

  path += '/path';
  createDir(path);

  path += '/to';
  createDir(path);

  appendFileSync(`${path}/other.txt`, '');

  createDir(`${path}/empty`);
  createDir(`${path}/empty/folder`);

  path += '/file';
  createDir(path);

  path += '/test.txt';
  appendFileSync(path, '');

  const result = executeOnFolders('./.temp/path/', (localPath, folder) => [localPath, folder]);

  rmSync('./.temp/path/', { recursive: true });

  expect(result.length).toBe(5);
  expect(result[0][0]).toBe('./.temp/path/to/empty/folder');
  expect(result[1][0]).toBe('./.temp/path/to/empty');
  expect(result[1][1][0]).toBe('folder');

  expect(result[2][0]).toBe('./.temp/path/to/file');
  expect(result[2][1][0]).toBe('test.txt');

  expect(result[3][0]).toBe('./.temp/path/to');
  expect(result[3][1][0]).toBe('empty');
  expect(result[3][1][1]).toBe('file');
  expect(result[3][1][2]).toBe('other.txt');

  expect(result[4][0]).toBe('./.temp/path');
  expect(result[4][1][0]).toBe('to');
});
