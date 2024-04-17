function isArray(string: any) {
    if (typeof string === 'object' && string.length !== undefined) {
        return true;
    }

    return false;
}

export default isArray;