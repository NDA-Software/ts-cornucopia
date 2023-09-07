# indexer (path: string, options: Options) - 2.0.0

## Description

This function's objective is to create an index file that imports all other files inside the same folder and exports them together, for simpler importing and implementation of dynamic-like imports.

## Parameters

-   path: the string of the path or an array of string with paths to all folders that should be indexed.
-   options: configuration object to change how the indexer works.

## Options

-   ignoredFiles (Default: null): An array with file names that should not be indexed.
-   overwriteBaseText (Default: null): An string to overwrite the comment that is added to the start of every file.
-   indexExtension (Default: 'ts'): Decides the extension of the index files generated.
-   nameCasing (Default: 'camelCase'): Decides between 'camelCase' or 'PascalCase' the pattern in which the index files will name the exported indexed files.
-   recursive (Default: false): When set to true this will repeat its function recursively in all folders inside the starting path.

## Returned Value

-   Void

## Usage:

```
// Assuming folder structure:
// /path/to/truth.ts
// /path/to/lies.ts

import { indexer } from "ts-cornucopia/scripts";

indexer("./path/");

// This will create two index files.
// One inside /path/to/ which will reference the files truth.ts and lies.ts.
// The other inside /path/ and this one will only reference the folder /path/to/ in itself thus making it possible to import everything from /path/to/ by only calling /path/ in the import.
```
