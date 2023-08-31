import fs from 'fs';

const proccessTemplate = (templateFile: string, dataToOverwrite: Record<string, string> = {}): string => {
    let templateText = fs.readFileSync(templateFile).toString();

    for (const key in dataToOverwrite)
        if (Object.hasOwn(dataToOverwrite, key))
            templateText = templateText.replaceAll(`{{${key.toUpperCase()}}}`, dataToOverwrite[key]);

    return templateText;
};

export default proccessTemplate;
