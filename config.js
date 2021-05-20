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

function get_upm_config_file_path ()
{
    if (is_windows) {
        return `${process.env.APPDATA}/upm-gui/config`
    } else {
        return `/home/${require("os").userInfo().username}/.config/upm/config`
    } 
}

function get_secretkey_file_path ()
{
    if (is_windows) {
        return `${process.env.APPDATA}/upm-gui/secretkey`
    } else {
        return `/home/${require("os").userInfo().username}/.config/upm/secretkey`
    } 
}

var config_file = editJsonFile(get_upm_config_file_path(), {autosave: true}) 

if (!config_file.get("settings")) {
    config_file.set("settings", default_config)
}
if (!config_file.get("upm_path")) {
    config_file.set("upm_path", get_upm_path())
}

var config = editJsonFile(config_file.get("upm_path"), {autosave: true})
var secretkey = editJsonFile(get_secretkey_file_path(), {autosave: true}) 

module.exports = { config, config_file, secretkey, is_windows, get_secretkey_file_path}