function deepClone(obj) {
    const clObj = {};
    for(const i in obj) {
      if (obj[i] instanceof Object) {
        clObj[i] = deepClone(obj[i]);
        continue;
      }
      clObj[i] = obj[i];
    }
    return clObj;
};

export default deepClone;