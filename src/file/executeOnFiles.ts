import { readdirSync, statSync } from 'fs';

type execCallback = (filePath: string) => any;

export interface executeOnFilesOptions {
    recursive?: boolean
    skipFolders?: boolean,
    ignoredFiles?: string | string[]
}

const executeOnFiles = (
    folderPath: string,
    callback: execCallback,
    options: executeOnFilesOptions = {}
): any[] => {
    const {
        recursive = false,
        skipFolders = true
    } = options;

    let { ignoredFiles = [] } = options;

    if (typeof ignoredFiles === 'string')
        ignoredFiles = [ignoredFiles];

    const lastIndex = folderPath.length - 1;
    const lastCharacter = folderPath.substring(lastIndex);

    if (lastCharacter === '/')
        folderPath = folderPath.substring(0, lastIndex);

    const folder = readdirSync(folderPath);

    let responses: any[] = [];

    for (const item of folder) {
        if (ignoredFiles.includes(item))
            continue;

        const filePath = `${folderPath}/${item}`;

        if (statSync(filePath).isDirectory()) {
            if (recursive)
                responses = responses.concat(executeOnFiles(filePath, callback, options));

            if (skipFolders)
                continue;
        }

        responses.push(callback(filePath));
    }

    return responses;
};

export default executeOnFiles;
