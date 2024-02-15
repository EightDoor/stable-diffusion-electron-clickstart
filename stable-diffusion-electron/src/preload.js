// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const path = require("node:path")
const {contextBridge, ipcRenderer} = require("electron")

contextBridge.exposeInMainWorld("electronApI", {
    getDeviceInfo: () => ipcRenderer.invoke("getDeviceInfo"),
    openExternalUrl: (url) => ipcRenderer.send("openExternalUrl", url),
    oneClickStart: () => ipcRenderer.send("oneClickStart"),
    oneClickClose: () => ipcRenderer.invoke("oneClickClose"),
    updateStableDiffusionChildVal: (callback) => ipcRenderer.on("update-stable-diffusion-child", (_event, value) => callback(value))
})
