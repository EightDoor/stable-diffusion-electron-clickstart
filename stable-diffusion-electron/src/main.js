const {app, BrowserWindow, Menu, ipcMain, shell, utilityProcess, clipboard, dialog} = require('electron');
const path = require('path');
const fsPromises = require("node:fs/promises")
const fs = require("node:fs")
const child_process = require("node:child_process")
const log = require("electron-log/main")
const systeminfo = require("systeminformation")
const crypto = require("crypto")
const kill = require("tree-kill")
// const {updateElectronApp} = require('update-electron-app');

// updateElectronApp();

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
    ipcMain.handle("getFolderFiles", getFolderFiles)
    ipcMain.on("openFolder", openFolder)
    ipcMain.on("clipboardWriteText", clipboardWriteText)
    ipcMain.handle("saveFile", saveFile)
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
        // const cpu = await systeminfo.cpu();
        // const mem = await systeminfo.mem()
        const graphics = await systeminfo.graphics()
        // const osInfo = await systeminfo.osInfo()
        // const users = await systeminfo.users()

        const result = {
            // cpu: cpu,
            // mem: mem,
            graphics: graphics,
            // osInfo: osInfo,
            // users: users
        }
        resolve(jsonEncode(result))
    })
}

const projectBasePath = path.join(__dirname, "../../../")

/**
 * 打开地址
 */
function openExternalUrl(event, url) {
    console.log(event)
    console.log(url)
    shell.openExternal(url)
}

/**
 * 写入剪切板文本
 * @param event
 * @param text
 */
function clipboardWriteText(event, text) {
    clipboard.writeText(text)
}

/**
 * 保存文件
 * @param event
 * @param savePath
 * @param title
 */
function saveFile(event, savePath, title = '') {
    return new Promise((resolve, reject) => {
        dialog.showSaveDialog({
            title,
        }).then(async res => {
            console.log(res, 'res')
            if (!res.canceled) {
                const filePath = res.filePath;
                // 获取文件名称
                const fileName = path.basename(filePath)
                const savePathResult = path.join(projectBasePath, savePath, fileName)
                // 读取源文件内容
                const data = await fsPromises.readFile(filePath);
                fsPromises.writeFile(savePathResult, data).then(() => {
                    resolve(true)
                }).catch((err) => {
                    reject(err)
                })
            } else {
                resolve(false);
            }
        }).catch(err => {
            reject(err)
        })
    })
}


/**
 * 获取文件夹文件列表
 */
function getFolderFiles(event, folder) {
    return new Promise((resolve, reject) => {
        console.log(projectBasePath, 'projectBasePath')
        console.log(folder, 'folder')

        const folderPath = path.join(projectBasePath, folder)
        console.log(folderPath, 'folderPath')
        fsPromises.readdir(folderPath, {
            recursive: false,  // 不需要读取目录内容 递归
        }).then(async (files) => {
            const list = []
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const filePath = path.join(folderPath, file);
                const stat = await fsPromises.stat(filePath)
                const fileType = stat.isFile() ? "文件" : stat.isDirectory() ? '文件夹' : '未知'
                // const SHA256 = hashFileAsync(filePath, algorithmType.SHA256)
                const obj = {
                    size: stat.size,
                    name: file,
                    fileType,
                    path: filePath,
                    createTime: stat.birthtime,
                    updateTime: stat.mtime,
                    // SHA256,
                }
                list.push(obj)
            }
            resolve(jsonEncode(list))
        }).catch(err => {
            reject(jsonEncode(err));
        })
    })
}

function openFolder(event, folderPath) {
    const fullPath = path.join(projectBasePath, folderPath);
    shell.openPath(fullPath)
}

/**
 * 保存执行的命令childProcess
 * @type {Map<any, any>}
 */
const childProcessData = new Map()

/**
 * 关闭启动的终端
 */
function oneClickClose(event, pid) {
    return new Promise((resolve, reject) => {
        const child = childProcessData.get(pid)
        if (child) {
            child.unref()
            removeChildProcess(pid);
            kill(pid, "SIGKILL", function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
        }
        resolve(true)
    })
}

/**
 * 一键启动 stable diffusion
 */
function oneClickStart(event) {
    const pathUrl = path.join(projectBasePath, "run-directml.bat")
    executeProcessChild(pathUrl, mainToRendererStable, [], {
        cwd: projectBasePath,
        detached: true,
        stdio: "ignore",
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
        data: '',
        pid: '',
    }
    log.debug(pathUrl, 'pathUrl')
    const ls = child_process.spawn(pathUrl, args, options)
    if (ls) {
        ls.on('spawn', (code) => {
            log.debug('进程生成成功 spawn')
            result.type = 'start'
            result.data = bufferToTxt(code ?? "")
            result.pid = ls.pid
            childProcessData.set(result.pid, ls);
            sendMsgFun(result)
        });
        if (ls.stdout) {
            ls.stdout.on('data', (data) => {
                result.type = 'msg';
                result.data = bufferToTxt(data)
                // sendMsgFun(result)
            });
        }

        if (ls.stderr) {
            ls.stderr.on('data', (data) => {
                result.type = 'error';
                result.data = bufferToTxt(data)
                sendMsgFun(result)
            });
        }
        ls.on('error', (code) => {
            // removeChildProcess(ls.pid);
            log.debug('子进程退出 exit')
            result.type = 'close'
            result.data = bufferToTxt(code)
            sendMsgFun(result)
        });

        ls.on('close', (code) => {
            // removeChildProcess(ls.pid);
            log.debug('子进程退出 exit')
            result.type = 'close'
            result.data = code
            sendMsgFun(result)
        });
        ls.on('exit', (code) => {
            // removeChildProcess(ls.pid);
            log.debug('进程退出 exit')
            result.type = 'close'
            result.data = code
            sendMsgFun(result)
        });
    }
}

function removeChildProcess(pid) {
    childProcessData.delete(pid);
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

/**
 * buff转换字符串
 * @param buffer
 * @returns {string}
 */
function bufferToTxt(buffer) {
    return buffer.toString('utf-8');
}

const algorithmType = {
    SHA256: "SHA256",
    SHA1: "SHA1",
    MD5: "MD5"
}

async function hashFileAsync(filePath, algorithm) {
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error("The file does not exist, make sure your file is correct!");
        }
        if (!algorithmType.hasOwnProperty(algorithm)) {
            throw new Error("Non-support algorithm, make sure your algorithm is [SHA256, SHA1, MD5] !");
        }
        let buffer = fs.readFileSync(filePath);
        let hash = crypto.createHash(algorithm.toLowerCase());
        hash.update(buffer);
        return hash.digest('hex');
    } catch (error) {
        return error;
    }
}
