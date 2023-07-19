import { app, BrowserWindow } from 'electron'
let win
 
/**
 * @Description: electron程序入口
 * @Author: Etc.End
 * @Copyright: TigerSong
 * @CreationDate 2023-05-20 14:39:26
 */
const createWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 1200,
        minHeight: 800,
        center: true,
        skipTaskbar: false,
        transparent: false,
        webPreferences: {
            contextIsolation: false,
            webSecurity: false,
        }
    })
 
    win.loadURL(
        'http://localhost:5173/'
    )
 
    win.webContents.openDevTools()
}
 
app.whenReady().then(() => {
    createWindow()
})
 
/**
 * @Description: 限制只能打开一个页面
 * @CreationDate 2023-05-20 14:35:52
 */
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
    app.quit()
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        if (win) {
            if (win.isMinimized()) win.restore()
            win.focus()
        }
    })
}
 
app.on('window-all-closed', function () {
    if(process.platform !== 'darwin') app.quit()
})