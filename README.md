# TS Cornucopia

## Description

The objective of this package is to aggregate small pieces of code that are easily needed in many projects of different scopes.

The idea came after tinkering for some years with different approaches to sharing codes between my own projects, resulting in different headaches. So why not simply bundle those inside an NPM package? And why not just leave it open source in case this can help someone else? So, here we are...

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [Contributing](/CONTRIBUTING.md)
- [License](/LICENSE.md)

## Installation

```
npm install ts-cornucopia
```

## Usage

To simplify this section, each separate function will have its own documentation file (linked on the name), and here I only list them all with a brief explanation:

### File

- [executeOnFiles](docs/file/executeOnFiles.md): This function is used to iterate inside a directory and its inner directories (recursively) and then execute a function with the path of each file found inside.

- [executeOnFolders](docs/file/executeOnFolders.md): This function is used to iterate inside a directory and its inner directories (recursively) and then execute a function with the path of each folder found, including the root folder of the execution.

- [proccessTemplate](docs/file/proccessTemplate.md): This function reads a file, replaces all iterations of named placeholders with values passed.

### Number

- [numberFormat](docs/number/numberFormat.md): This function converts a number into a string and adds a separator every three integer digits.

- [randomRange](docs/number/randomRange.md): This function returns a random integer between two values.

- [zeroPadding](docs/number/zeroPadding.md): This function adds "0"s as a padding to a string or number accordingly with its length.

### String

- [cammelToSpace](docs/string/cammelToSpace.md): This function detects cammelcase and adds a space behind every word, it also adds uppercase to the first letter of the first word.

- [firstToUppercase](docs/string/firstToUppercase.md): This function returns the given string with the changed first letter to be uppercase.

## Tests

To run the tests simply execute this command:

```
npm run test
```
