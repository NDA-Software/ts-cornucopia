import fs from 'fs';

const proccessTemplate = (templateFile: string, dataToOverwrite: Record<string, string> = {}): string => {
    let templateText = fs.readFileSync(templateFile).toString();

    for (const key in dataToOverwrite) {
        const searchString = `{{${key.toUpperCase()}}}`;

        while (templateText.includes(searchString))
            templateText = templateText.replace(searchString, dataToOverwrite[key] ?? '');
    }

    return templateText;
};

export default proccessTemplate;
