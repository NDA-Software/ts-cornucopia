# executeOnFiles (path: string, callback: function) - 1.0.0

## Description

This function is used to iterate inside a directory and its inner directories (recursively) and then execute a function with the path of each folder found, including the root folder of the execution.

## Parameters

- path: Path to the directory to be iterated.
- callback: A function that should receive the path to a folder and an array of strings with the name of all files inside the folder as its parameters.

## Returned Value

- Array<any>: An array with everything returned by the callback function passed as parameter.

## Usage:

```
// Assuming folder structure:
// /path/to/file/example.txt
// /path/to/other.txt
// /path/to/empty/folder/

import { executeOnFolder } from "ts-cornucopia/file";

const results = executeOnFolder("/path", (path, folder) => [path, folder]);

console.log(results);
// [
// '/path/to/empty/folder', [],
// '/path/to/empty', ['folder'],
// '/path/to/file', ['example.txt'],
// '/path/to', ['empty', 'file', 'other.txt']
// '/path', ['to']
// ]
```
