const firstToUppercase = (word: string): string => {
    if (word == null)
        return '';

    return word.substring(0, 1).toUpperCase() + word.substring(1);
};

export default firstToUppercase;
