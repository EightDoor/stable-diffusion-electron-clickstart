import Utils from "@/utils/index";

const IpcRenderer = {
    /**
     * 获取设备信息
     */
    async getDeviceInfo() {
        const result = await window.electronApI.getDeviceInfo()
        return Utils.jsonDeCode(result);
    },
    /**
     * 通过外部浏览器打开
     * @param url
     */
    openExternalUrl(url) {
        window.electronApI.openExternalUrl(url)
    },
    /**
     * 一键启动
     * @returns {Promise<void>}
     */
    oneClickStart() {
        window.electronApI.oneClickStart();
    },
    async oneClickClose() {
        return window.electronApI.oneClickClose();
    },
    /**
     * 更新终端数据
     * @param callback
     */
    updateStableDiffusionChildVal(callback) {
        window.electronApI.updateStableDiffusionChildVal(callback)
    },
    /**
     * 获取文件夹文件列表
     * @param folder
     */
    async getFolderFiles(folderPath) {
        const result = await window.electronApI.getFolderFiles(folderPath);
        return Utils.jsonDeCode(result)
    },
    /**
     * 打开文件夹
     * @param folderPath
     */
    openFolder(folderPath) {
        window.electronApI.openFolder(folderPath);
    },
    /**
     * 复制内容
     */
    clipboardWriteText(text) {
        window.electronApI.clipboardWriteText(text);
    }
}

export default IpcRenderer;
