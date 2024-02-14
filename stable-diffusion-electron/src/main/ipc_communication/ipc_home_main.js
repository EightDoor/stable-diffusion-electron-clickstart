const {ipcMain} = require("electron/main")
const IpcHomeConstant = require("./ipc_home_constant.js")
/**
 * 主进程
 */
const ipcHomeMain = ()=>{
    ipcMain.on(IpcHomeConstant.getDeviceInfo, ()=>{

    })
}


module.exports = ipcHomeMain
