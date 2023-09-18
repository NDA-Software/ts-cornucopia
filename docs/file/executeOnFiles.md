# executeOnFiles (path: string, callback: function, options: executeOnFilesOptions) - 1.0.0

## Description

This function is used to iterate inside a directory and then execute a function with the path of each file found inside.

## Parameters

-   path: Path to the directory to be iterated.
-   callback: A function that should receive the path to a file as its parameter.

## Options

-   recursive (Default: false): When set to true this will repeat its function recursively in all folders inside the starting path.
-   skipFolders (Default: true): As default this prevents folders from being threated as files, if this is set to false, the callback will also be called with all the folders. This does not prevent recursivity of recursive is set to true, both will happen.

## Returned Value

-   Array<any>: An array with everything returned by the callback function passed as parameter.

## Usage:

```
// Assuming folder structure:
// /path/to/file/example.txt
// /path/to/other.txt
// /path/to/empty/folder/

import { executeOnFiles } from "ts-cornucopia/file";

const result = executeOnFiles("/path", (file) => file, { recursive: true });

console.log(result);
// [
// '/path/to/file/example.txt',
// '/path/to/other.txt'
// ]
```
