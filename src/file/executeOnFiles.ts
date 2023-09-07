import { readdirSync, statSync } from 'fs';

type execCallback = (filePath: string) => any;

export interface executeOnFilesOptions {
    recursive?: boolean
    skipFolders?: boolean
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

    const lastIndex = folderPath.length - 1;
    const lastCharacter = folderPath.substring(lastIndex);

    if (lastCharacter === '/')
        folderPath = folderPath.substring(0, lastIndex);

    const folder = readdirSync(folderPath);

    let responses: any[] = [];

    for (const item of folder) {
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
