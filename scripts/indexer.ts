import { writeFileSync, statSync } from 'fs';

import executeOnFolders from '../src/file/executeOnFolders';

executeOnFolders('./src', (path, folder) => {
  let content = '/* AUTO-GENERATED, DO NOT EDIT MANUALLY */\n';

  let importText = '';
  let exportText = '';
  let exportDefaultText = 'export default {\n';
  for (const fileName of folder) {
    if (fileName === 'index.ts')
      continue;

    let name = fileName;
    if (!statSync(`${path}/${fileName}`).isDirectory())
      name = fileName.substring(0, fileName.length - 3);

    importText += `import ${name} from './${name}';\n`;

    exportText += `export { default as ${name} } from './${name}';\n`;

    exportDefaultText += `  ${name},\n`;
  }

  exportDefaultText += '};\n';

  content += `${importText}\n${exportText}\n${exportDefaultText}`;

  writeFileSync(`${path}/index.ts`, content);

  return true;
});
