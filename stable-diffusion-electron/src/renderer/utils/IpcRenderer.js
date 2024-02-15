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
}

export default IpcRenderer;
