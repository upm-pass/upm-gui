const {app, BrowserWindow} = require('electron')
const path = require('path')
const editJsonFile = require("edit-json-file")
let config = editJsonFile(`/home/senpai/.upm`, {autosave: true})

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    
    if (config.get("MasterKey")) {
        mainWindow.loadFile(path.join(__dirname, 'src/ui/login.html'))
    } else {
        mainWindow.loadFile(path.join(__dirname, 'src/ui/cmk.html'))
    }

}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})
