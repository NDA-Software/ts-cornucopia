import { existsSync, readFileSync, writeFileSync } from 'fs';

import { firstToUppercase } from '../string';
import { executeOnFolders } from '../file';

const baseText = '/* AUTO-GENERATED, DO NOT EDIT MANUALLY */';

export interface indexerParams {
    path: string | string[];
    ignoredFiles?: string[] | null;
    overwriteBaseText?: string | null;
    indexExtension?: 'ts' | 'js';
    nameCasing?: 'camelCase' | 'pascalCase';
}

export default function ({
    path,
    ignoredFiles = null,
    overwriteBaseText = null,
    indexExtension = 'ts',
    nameCasing = 'camelCase'
}: indexerParams): void {
    if (typeof path === 'string')
        path = [path];

    let finalNameFormat = (item: string, _: number): string => firstToUppercase(item);

    if (nameCasing === 'camelCase')
        finalNameFormat = (item: string, i: number) => i === 0 ? item : firstToUppercase(item);

    for (const currentPath of path) {
        executeOnFolders(currentPath, async (currentFolder, files) => {
            let text = overwriteBaseText ?? baseText;

            files = files
                .filter((file) => file.indexOf('.') !== 0)
                .map((file) => file.replace('.js', '').replace('.ts', ''))
                .filter((file) => file.toLowerCase() !== 'index');

            let importText = '\n';
            let individualExportText = '\n';
            let defaultExportText = '\nexport default {\n';

            let firstExport = true;
            for (const file of files) {
                if (ignoredFiles !== null && ignoredFiles.includes(file))
                    continue;

                const finalName = file
                    .split(' ')
                    .map(finalNameFormat)
                    .join('');

                importText += `import ${finalName} from './${file}';\n`;

                individualExportText += `export { default as ${finalName} } from './${file}';\n`;

                defaultExportText += `${!firstExport ? ',\n' : ''}    ${finalName}`;

                firstExport = false;
            }

            defaultExportText += '\n};\n';

            text += importText;
            text += individualExportText;
            text += defaultExportText;

            const indexFile = `${currentFolder}/index.${indexExtension}`;
            if (
                !existsSync(indexFile) ||
                readFileSync(indexFile).toString() !== text
            )
                writeFileSync(indexFile, text);
        });
    }
}
