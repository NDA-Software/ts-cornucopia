import firstToUppercase from './firstToUppercase';

const cammelToSpace = (text: string, overrideSeparator = ' ') => {
  text = text.replace(/([A-Z])/g, `${overrideSeparator}$1`).trim();

  text = firstToUppercase(text);

  return text;
};

export default cammelToSpace;
