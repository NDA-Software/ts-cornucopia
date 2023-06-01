# TS Cornucopia

## Description

The objective of this package is to aggregate small pieces of code that are easily needed in many projects of different scopes.

The idea came after tinkering for some years with different approaches to sharing codes between my own projects, resulting in different headaches. So why not simply bundle those inside an NPM package? And why not just leave it open source in case this can help someone else? So, here we are...

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#how-to-contribute)
- [Tests](#tests)
- [Credits](#credits)
- [License](#mit-license)

## Installation

```
npm install ts-cornucopia
```

## Usage

To simplify this section, each separate function will have its own documentation file (linked on the name), and here I only list them all with a brief explanation:

### File

- [executeOnFiles](docs/file/executeOnFiles.md): This function is used to iterate inside a directory and its inner directories (recursively) and then execute a function with the path of each file found inside.

- [executeOnFolders](docs/file/executeOnFolders.md): This function is used to iterate inside a directory and its inner directories (recursively) and then execute a function with the path of each folder found, including the root folder of the execution.

### Number

- [numberFormat](docs/number/numberFormat.md): This function converts a number into a string and adds a separator every three integer digits.

- [randomRange](docs/number/randomRange.md): This function returns a random integer between two values.

- [zeroPadding](docs/number/zeroPadding.md): This function adds "0"s as a padding to a string or number accordingly with its length.

### String

- [cammelToSpace](docs/string/cammelToSpace.md): This function detects cammelcase and adds a space behind every word, it also adds uppercase to the first letter of the first word.

- [firstToUppercase](docs/string/firstToUppercase.md): This function returns the given string with the changed first letter to be uppercase.

## How to Contribute

If you believe you can make an improvement to this package by adding your own functions and fixing any bugs you find, please refer to these rules before submitting a pull request or opening an issue:

- Fork from the branch dev to start work.
- All code must conform to the lint patterns configured in .eslintrc.json.
- Avoid using elses and tons of inner ifs like the plague; please familiarize yourself with early returns/errors to keep the code easier to read.
- All functions should be easy to understand by reading their code without the need for a big documentation.
- Do not add dependencies to the package.json. To keep things always clear and unbloated, this project shouldn't have dependencies besides the ones used for development itself.
- You are free to add your own credits at the start of a new function file if you want to, but all new codes must conform to the same [License](#mit-license) written by the end of this readme.
- To test the lint conformity, you can execute the command:

```
npm run lint
```

- All functions must have a test file using the pattern:
    - For file: src/path/to/file.ts
    - Expected test file: src/tests/path/to/file.test.ts
- Add a brief documentation file using the pattern:
    - For file: src/path/to/file.ts
    - Expected Doc file: docs/path/to/file.md
- Every new method must be added to this readme with a link to its documentation file and a brief description in the [Usage](#usage) section.
- All tests are expected to have at least a happy path, and if any exception is written, a test to trigger it must also be added to the test file.
- Don't forget to add a link to yourself in the [Credits](#credits) section of this readme.
- Mostly everything is open to discussion. While I do not guarantee a change, I am always open to hearing other people's opinions on this package.
- It is always possible, either due to a lack of knowledge or new updates to JS/TS that some of these functions become redundant or obsolete. Please reach out.
- No harassment of any kind will be tolerated.

## Tests

To run the tests simply execute this command:

```
npm run test
```

## Credits

- [This Readme Tutorial](https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide) for help with this readme file.

## MIT License

Copyright (c) 2023 Erik Marques Schroeder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
