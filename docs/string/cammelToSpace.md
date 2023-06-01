# cammelToSpace (text: string, overrideSeparator: string) - 1.0.0

## Description

This function detects cammelcase and adds a space behind every word, it also adds uppercase to the first letter of the first word.

## Parameters

- text: string parameter to be changed.
- overrideSeparator (Default: " "): optional parameter to change what is added instead of space between words.

## Returned Value

- String: formatted result.

## Usage:

```
import { cammelToSpace } from "ts-cornucopia/string";

const result = cammelToSpace("manyWordsOnCammelcase");

console.log(result);
// "Many Words On Cammelcase"
```
