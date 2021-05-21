const editJsonFile = require("edit-json-file")
const default_config = {
    "notification_position": "top_right"
}

function is_windows  () {
    if (process.platform == "win32")
        return true
    else
        return false
}

function get_upm_path () 
{
    if (is_windows) {
        return `${process.env.APPDATA}/upm-gui/.upm`
    } else {
        return `/home/${require("os").userInfo().username}/.config/upm/.upm`
    }
}

var config_file = process.platform == "win32" ? editJsonFile(`${process.env.APPDATA}/upm-gui/config`, {autosave: true}) : editJsonFile(`/home/${require("os").userInfo().username}/.config/upm/config`, {autosave: true})

if (!config_file.get("settings")) {
    config_file.set("settings", default_config)
}
if (!config_file.get("upm_path")) {
    config_file.set("upm_path", get_upm_path())
}

var config = editJsonFile(config_file.get("upm_path"), {autosave: true})
var secretkey = process.platform == "win32" ? editJsonFile(`${process.env.APPDATA}/upm-gui/secretkey`, {autosave: true}) : editJsonFile(`/home/${require("os").userInfo().username}/.config/upm/secretkey`, {autosave: true})

module.exports = { config, config_file, secretkey, is_windows }