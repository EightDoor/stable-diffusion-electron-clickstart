const Utils = {
    jsonDeCode(val) {
        return JSON.parse(val)
    },
    getFileSize(size) {//把字节转换成正常文件大小
        if (!size) return "";
        const num = 1024.00; //byte
        if (size < num)
            return size + "B";
        if (size < Math.pow(num, 2))
            return (size / num).toFixed(2) + "KB"; //kb
        if (size < Math.pow(num, 3))
            return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
        if (size < Math.pow(num, 4))
            return Math.round((size / Math.pow(num, 3))) + "G"; //G
        return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
    },
    vRam(val) {
        return Math.round(val / 1024)
    }
}

export default Utils
