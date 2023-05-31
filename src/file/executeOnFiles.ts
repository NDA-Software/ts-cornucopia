import { readdirSync, statSync } from 'fs';

type execCallback = (filePath: string) => any;

const executeOnFiles = (folderPath: string, callback: execCallback) => {
  const folder = readdirSync(folderPath);

  let responses: Array<any> = [];

  for (const item of folder) {
    const filePath = `${folderPath}/${item}`;

    if (statSync(filePath).isDirectory()) {
      responses = responses.concat(executeOnFiles(filePath, callback));

      continue;
    }

    responses.push(callback(filePath));
  }

  return responses;
};

export default executeOnFiles;
