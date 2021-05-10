// create master key
const editJsonFile = require("edit-json-file");
const { encrypt, decrypt } = require("../crpyto")
let config_file = editJsonFile(`/home/${require("os").userInfo().username}/.config/upm/config`, {autosave: true})
let config = editJsonFile(config_file.get("upm_path"), {autosave: true})

document.getElementById("cmk-submit").addEventListener("click", HandleCmk);

function HandleCmk() {
    let input = document.getElementById('masterkey-input').value
    let input_retype = document.getElementById('masterkey-input-retype').value
    
    if (input) {
        if (input == input_retype) {
            config.set("MasterKey", encrypt(input))
            window.location = "login.html"
        } else {
            alert("wrong password")
        }
    } else {
        alert("no input")
    }
}
