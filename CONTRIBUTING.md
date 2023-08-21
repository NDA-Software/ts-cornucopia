If you believe you can make an improvement to this package by adding your own functions and fixing any bugs you find, please refer to these rules before submitting a pull request or opening an issue:

- All code must conform to the lint patterns configured in .eslintrc.json.
- Avoid using elses and tons of inner ifs like the plague; please familiarize yourself with early returns/errors to keep the code easier to read.
- All functions should be easy to understand by reading their code without the need for a big documentation.
- Do not add dependencies to the package.json. To keep things always clear and unbloated, this project shouldn't have dependencies besides the ones used for development itself.
- You are free to add your own credits at the start of a new function file if you want to, but all new codes must conform to the same [License](/LICENSE.md).
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
- Every new method must be added to the [README](/README.md) with a link to its documentation file and a brief description in the [Usage](/README.md#usage) section.
- All tests are expected to have at least a happy path, and if any exception is written, a test to trigger it must also be added to the test file.
- Mostly everything is open to discussion. While I do not guarantee a change, I am always open to hearing other people's opinions on this package.
- It is always possible, either due to a lack of knowledge or new updates to JS/TS that some of these functions become redundant or obsolete. Please reach out.
