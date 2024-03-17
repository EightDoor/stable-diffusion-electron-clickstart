import {dayjs} from "element-plus";
import IpcRenderer from "@/utils/IpcRenderer";
import logger from "@/utils/logger";
import Config from "@/config";

const Utils = {
    /**
     * 基础文件夹路径
     * @returns {string}
     */
    async getBaseFolder(path) {
        const resultPath = Config.baseFolder + path
        const cwd = await IpcRenderer.getProcessCWD(resultPath);
        logger.info(cwd, 'cwd 文件夹路径')
        return cwd
    },
    jsonDeCode(val) {
        return JSON.parse(val)
    },
    getFileSize(size) {//把字节转换成正常文件大小
        // if (!size) return "";
        // const num = 1024.00; //byte
        // if (size < num)
        //     return size + "B";
        // if (size < Math.pow(num, 2))
        //     return (size / num).toFixed(2) + "KB"; //kb
        // if (size < Math.pow(num, 3))
        //     return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
        // if (size < Math.pow(num, 4))
        //     return Math.round((size / Math.pow(num, 3))) + "G"; //G
        // return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T

        if (!size) return "";

        const base = 1024;
        let unit = ['B', 'KB', 'MB', 'GB', 'TB'];

        for (let i = 0; i < unit.length; i++) {
            if (size < Math.pow(base, i + 1)) {
                return (size / Math.pow(base, i)).toFixed(2) + unit[i];
            }
        }
    },
    vRam(val) {
        return Math.round(val / 1024)
    },
    /**
     * 格式化时间
     * @param val
     * @param type
     * @returns {*}
     */
    formatTime(val = Date.now(), type = "YYYY-MM-DD HH:mm:ss") {
        return dayjs(val).format(type)
    },
}

export default Utils
