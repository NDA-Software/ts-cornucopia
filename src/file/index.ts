/* AUTO-GENERATED, DO NOT EDIT MANUALLY */
import executeOnFiles, * as executeOnFilesNamed from './executeOnFiles';
import executeOnFolders, * as executeOnFoldersNamed from './executeOnFolders';
import proccessTemplate, * as proccessTemplateNamed from './proccessTemplate';

export { executeOnFiles };
export { executeOnFolders };
export { proccessTemplate };

export * from './executeOnFiles';
export * from './executeOnFolders';
export * from './proccessTemplate';

export default {
    executeOnFiles,
    executeOnFolders,
    proccessTemplate,
    ...executeOnFilesNamed,
    ...executeOnFoldersNamed,
    ...proccessTemplateNamed
};
