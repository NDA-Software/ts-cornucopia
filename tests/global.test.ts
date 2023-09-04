import { readFileSync, existsSync } from 'fs';

import executeOnFiles from '../src/file/executeOnFiles';

// This file checks if each file has a corresponding test and doc files.
// To force future implementations to all have at least some testing and documentation.

const checkFiles = (
    folder: string,
    destinyFolder: string,
    finalSufix: string,
    done: jest.DoneCallback
): any | null => {
    const errors = executeOnFiles(folder, (filePath) => {
        if (filePath.includes('index.ts'))
            return null;

        filePath = `${destinyFolder}/${filePath.substring(6, filePath.length - 3)}.${finalSufix}`;

        if (!existsSync(filePath))
            return `Missing file: '${filePath}'.`;

        return null;
    }).filter((item) => item !== null);

    if (errors.length > 0)
        return done(errors);

    return done();
};

const termsToCheck = [
    { name: 'PARAMETER', errorName: 'parameters' },
    { name: 'PARAMETERTYPE', errorName: "parameters' typing" },
    { name: 'STARTINGVERSION', errorName: 'starting version' },
    { name: 'DESCRIPTION', errorName: 'description' },
    { name: 'PARAMETERDESCRIPTION', errorName: "parameters' description" },
    { name: 'RETURNTYPE', errorName: 'return typing' },
    { name: 'EXAMPLEPARAMETERS', errorName: 'example parameters' },
    { name: 'EXAMPLERESULT', errorName: 'example result' }
];

test('Checking test files...', (done) => checkFiles('./src', './tests', 'test.ts', done));

test('Checking doc files...', (done) => checkFiles('./src', './docs', 'md', done));

test('Checking unimplemented information in doc files...', (done: jest.DoneCallback) => {
    const errors: string[] = [];

    executeOnFiles('./docs', (filePath) => {
        const text = readFileSync(filePath);

        for (const term of termsToCheck)
            if (text.includes(term.name))
                errors.push(`Missing ${term.errorName} where {{${term.name}}} is written on file '${filePath}'`);
    });

    if (errors.length > 0)
        return done(errors);

    return done();
});

test('Looking for mentions of each file...', (done) => {
    const readMe = readFileSync('./README.md').toString();

    const errors = executeOnFiles('./src', (filePath) => {
        const lastFolder = filePath.lastIndexOf('/') + 1;
        const extensionPoint = filePath.lastIndexOf('.');

        const fileName = filePath.substring(lastFolder, extensionPoint);

        if (fileName === 'index')
            return null;

        const filePathCheck = `-   [${fileName}](docs/${filePath.substring(6, extensionPoint)}.md)`;

        if (!readMe.includes(filePathCheck))
            return `Missing mention of '${filePathCheck}' in README.md.`;

        return null;
    }).filter((item) => item !== null);

    if (errors.length > 0)
        return done(errors);

    return done();
});
