import { readdirSync, statSync } from 'fs';

type execCallback = (filePath: string, folderContent: string[]) => any;

export interface executeOnFoldersOptions {
    recursive?: boolean,
    ignoredFiles?: string | string[]
}

const executeOnFolders = (
    folderPath: string,
    callback: execCallback,
    options: executeOnFoldersOptions = {}
): any[] => {
    const { recursive = false } = options;

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

        if (recursive && statSync(filePath).isDirectory())
            responses = responses.concat(executeOnFolders(filePath, callback, options));
    }

    responses.push(callback(folderPath, folder));

    return responses;
};

export default executeOnFolders;
