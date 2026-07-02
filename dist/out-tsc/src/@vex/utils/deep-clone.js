function deepClone(obj) {
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }
    if (obj instanceof Date) {
        const copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    if (obj instanceof Array) {
        const copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepClone(obj[i]);
        }
        return copy;
    }
    const copy = {};
    Object.keys(obj).forEach((key) => {
        copy[key] = deepClone(obj[key]);
    });
    return copy;
}
export default deepClone;
//# sourceMappingURL=deep-clone.js.map