const {app, BrowserWindow} = require('electron')
const path = require('path')
const editJsonFile = require("edit-json-file")
let config_file = editJsonFile(`/home/${require("os").userInfo().username}/.config/upm/config`, {autosave: true})
let config = editJsonFile(config_file.get("upm_path"), {autosave: true})
const default_config = {
    "notification_position": "top_right"
}

if (!config_file.get("settings")) {
    config_file.set("settings", default_config)
}
if (!config_file.get("upm_path")) {
    config_file.set("upm_path", `/home/${require("os").userInfo().username}/.config/upm/.upm`)
}

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
