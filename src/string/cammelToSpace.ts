import firstToUppercase from './firstToUppercase';

const cammelToSpace = (text: string, overrideSeparator = ' '): string => {
    text = text.replace(/([A-Z])/g, `${overrideSeparator}$1`).trim();

    text = firstToUppercase(text);

    return text;
};

export default cammelToSpace;
