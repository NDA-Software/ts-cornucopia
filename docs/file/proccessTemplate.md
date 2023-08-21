# proccessTemplate (templateFile: string, dataToOverwrite: Record<string, string>) - 1.0.0

## Description

This function reads a file, replaces all iterations of named placeholders with values passed. All placeholders must be uppercase and involved in a pair of bracers like this {{EXAMPLE}}.

## Parameters

- templateFile: Path to template file to be read.
- dataToOverwrite: List of named placeholders with their values. Casing in the names is ignored, always threated as uppercase.

## Returned Value

- String: String of processed template.

## Usage:

```
import { proccessTemplate } from "ts-cornucopia/file";

// Assuming existing file located/named "/test.txt" with content of "Hello {{NAME}}!".

const result = proccessTemplate("/test.txt", {name: "there"});

console.log(result);
// Hello there!
```
