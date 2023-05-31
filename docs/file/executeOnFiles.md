# executeOnFiles (path: string, callback: function) - 1.0.0

## Description

This function is used to iterate inside a directory and its inner directories (recursively) and then execute a function with the path of each file found inside.

## Parameters

- path: Path to the directory to be iterated.
- callback: A function that should receive the path to a file as its parameter.

## Returned Value

- Array<any>: An array with everything returned by the callback function passed as parameter.

## Usage:

```
// Assuming folder structure:
// /path/to/file/example.txt
// /path/to/other.txt
// /path/to/empty/folder/

import { executeOnFiles } from "ts-cornucopia/file";

const result = executeOnFiles("/path", (file) => file);

console.log(result);
// [
// '/path/to/file/example.txt',
// '/path/to/other.txt'
// ]
```
