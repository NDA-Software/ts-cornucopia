import { existsSync, readFileSync, writeFileSync } from 'fs';

import { firstToUppercase } from '../string';
import { executeOnFolders } from '../file';

const baseText = '/* AUTO-GENERATED, DO NOT EDIT MANUALLY */';

export interface indexerOptions {
    ignoredFiles?: string[] | null;
    overwriteBaseText?: string | null;
    indexExtension?: 'ts' | 'js';
    nameCasing?: 'camelCase' | 'PascalCase';
    recursive?: boolean,
    exportMode?: 'named' | 'default' | 'mixed'
}

export default function (
    path: string | string[],
    {
        ignoredFiles = null,
        overwriteBaseText = null,
        indexExtension = 'ts',
        nameCasing = 'camelCase',
        recursive = false,
        exportMode = 'mixed'
    }: indexerOptions = {}): void {
    if (typeof path === 'string')
        path = [path];

    let finalNameFormat = (item: string, _: number): string => firstToUppercase(item);

    if (nameCasing === 'camelCase')
        finalNameFormat = (item: string, i: number) => i === 0 ? item : firstToUppercase(item);

    const executionOptions = { recursive };

    for (const currentPath of path) {
        executeOnFolders(currentPath, async (currentFolder, files) => {
            let text = overwriteBaseText ?? baseText;

            files = files
                .filter((file) => file.indexOf('.') !== 0)
                .map((file) => file.replace('.js', '').replace('.ts', ''))
                .filter((file) => file.toLowerCase() !== 'index');

            let importText = '\n';

            let individualDefaultExportText = '\n';
            let individualNamedExportText = exportMode === 'mixed' ? '\n' : '';

            let defaultExportText = '\nexport default {\n';
            let namedExportText = '';

            let firstExport = true;
            for (const file of files) {
                if (ignoredFiles !== null && ignoredFiles.includes(file))
                    continue;

                const finalName = file
                    .split(' ')
                    .map(finalNameFormat)
                    .join('');

                let newImportText = '';
                switch (exportMode) {
                    case 'default':
                        newImportText = `${finalName}`;

                        individualDefaultExportText += `export { ${finalName} };\n`;

                        defaultExportText += `${!firstExport ? ',\n' : ''}    ${finalName}`;
                        break;

                    case 'named':
                        newImportText += `* as ${finalName}`;

                        individualDefaultExportText += `export * from './${file}';\n`;

                        defaultExportText += `${!firstExport ? ',\n' : ''}    ...${finalName}`;
                        break;

                    case 'mixed':
                        newImportText = `${finalName}, * as ${finalName}Named`;

                        individualDefaultExportText += `export { ${finalName} };\n`;
                        individualNamedExportText += `export * from './${file}';\n`;

                        defaultExportText += `${!firstExport ? ',\n' : ''}    ${finalName}`;
                        namedExportText += `,\n    ...${finalName}Named`;
                        break;
                }

                importText += `import ${newImportText} from './${file}';\n`;

                firstExport = false;
            }

            defaultExportText += namedExportText;
            defaultExportText += '\n};\n';

            text += importText;
            text += individualDefaultExportText;
            text += individualNamedExportText;
            text += defaultExportText;

            const indexFile = `${currentFolder}/index.${indexExtension}`;
            if (
                !existsSync(indexFile) ||
                readFileSync(indexFile).toString() !== text
            )
                writeFileSync(indexFile, text);
        }, executionOptions);
    }
}
