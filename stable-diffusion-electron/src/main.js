const {app, BrowserWindow, Menu, ipcMain, shell, utilityProcess} = require('electron');
const path = require('path');
const child_process = require("node:child_process")
const log = require("electron-log/main")
const systeminfo = require("systeminformation")

log.initialize()
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow;

// log.info("test 测试数据")
// log.error("测试错误")
const createWindow = () => {
    // 取消顶部栏
    Menu.setApplicationMenu(null)
    icpListenInit()
    // Create the browser window.
    mainWindow = new BrowserWindow({
        // width: 800,
        // height: 600,
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


/**
 * 监听ipc信息
 */
const icpListenInit = () => {
    ipcMain.handle("getDeviceInfo", getDeviceInfo)
    ipcMain.on("openExternalUrl", openExternalUrl)
    ipcMain.on("oneClickStart", oneClickStart)
    ipcMain.handle("oneClickClose", oneClickClose)
}

function getFileSize(size) {//把字节转换成正常文件大小
    if (!size) return "";
    const num = 1024.00; //byte
    if (size < num)
        return size + "B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "KB"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "MB"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

function jsonEncode(val) {
    return JSON.stringify(val)
}

/**
 * 获取设备信息
 */
function getDeviceInfo(event) {
    return new Promise(async (resolve, reject) => {
        const cpu = await systeminfo.cpu();
        const mem = await systeminfo.mem()
        const graphics = await systeminfo.graphics()
        const osInfo = await systeminfo.osInfo()
        // const users = await systeminfo.users()

        const result = {
            cpu: cpu,
            mem: mem,
            graphics: graphics,
            osInfo: osInfo,
            // users: users
        }
        resolve(jsonEncode(result))
    })
}

/**
 * 打开地址
 */
function openExternalUrl(event, url) {
    console.log(event)
    console.log(url)
    shell.openExternal(url)
}

// TODO  现在只能是一个命令，  需要做一个Map 存储  适用于打开其他的命令
// TODO 不然kill的时候 只能是关闭最后一个
let childSProcessStable;


/**
 * 关闭启动的终端
 */
function oneClickClose() {
    if (childSProcessStable) {
        return childSProcessStable.kill();
    }
    return false;
}

/**
 * 一键启动 stable diffusion
 */
function oneClickStart(event) {
    const cwdPath = path.join(__dirname, "../../..")
    const pathUrl = "../../../run-directml.bat"
    executeProcessChild(pathUrl, mainToRendererStable, [], {
        cwd: cwdPath,
    })
}


/**
 * 执行命令
 * @param pathUrl
 * @param sendMsgFun
 * @param args
 * @param options
 * @returns {Promise<unknown>}
 */
function executeProcessChild(pathUrl, sendMsgFun, args = [], options = {}) {
    const result = {
        type: '',
        data: ''
    }
    const processStartPath = path.join(__dirname, pathUrl)
    log.debug(processStartPath, 'processStartPath')
    childSProcessStable = child_process.spawn(processStartPath, args, options)
    childSProcessStable.on('spawn', (code) => {
        log.debug('进程生成成功 spawn')
        // result.type = 'spawn'
        // result.data = code
        // log.info(code)
        // mainToRendererStable(result);
    });
    childSProcessStable.stdout.on('data', (data) => {
        result.type = 'msg';
        result.data = bufferToTxt(data)
        sendMsgFun(result)
    });

    childSProcessStable.stderr.on('data', (data) => {
        result.type = 'error';
        result.data = bufferToTxt(data)
        sendMsgFun(result)
    });

    childSProcessStable.on('close', (code) => {
        log.debug('进程退出 exit')
        result.type = 'close'
        result.data = code
        sendMsgFun(result)
    });
}

function mainToRendererStable(value) {
    mainToRenderer('update-stable-diffusion-child', value)
}


/**
 * 主进程向子进程发送数据
 */
function mainToRenderer(type, value) {
    mainWindow.webContents.send(type, jsonEncode(value))
}

function bufferToTxt(buffer) {
    return buffer.toString('utf-8');
}
