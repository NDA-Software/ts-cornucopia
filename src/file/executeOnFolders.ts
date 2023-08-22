import { readdirSync, statSync } from 'fs';

type execCallback = (filePath: string, folderContent: Array<string>) => any;

const executeOnFolders = (folderPath: string, callback: execCallback) => {
  const lastIndex = folderPath.length - 1;
  const lastCharacter = folderPath.substring(lastIndex);

  if (lastCharacter === '/')
    folderPath = folderPath.substring(0, lastIndex);

  const folder = readdirSync(folderPath);

  let responses: Array<any> = [];

  for (const item of folder) {
    const filePath = `${folderPath}/${item}`;

    if (statSync(filePath).isDirectory())
      responses = responses.concat(executeOnFolders(filePath, callback));
  }

  responses.push(callback(folderPath, folder));

  return responses;
};

export default executeOnFolders;
