// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const path = require("node:path")

const ipcHomeRendererPath = path.join(__dirname, "main/ipc_communication/ipc_home_preload.js")
const ipcHomeRenderer = require(ipcHomeRendererPath)
//
console.log(ipcHomeRenderer, 'ipcHomePath')
console.log(__dirname, '__dirname')
