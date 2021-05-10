const editJsonFile = require("edit-json-file");
const { encrypt, decrypt } = require("../crpyto")
let config_file = editJsonFile(`/home/senpai/.config/upm/config`, {autosave: true})
let config = editJsonFile(config_file.get("upm_path"), {autosave: true})

document.getElementById("login").addEventListener("click", HandleLogin);
document.getElementById("masterkey-input").addEventListener("keyup", ({key}) => {
    if (key == "Enter")
        HandleLogin()
})

function HandleLogin() {
    let input = document.getElementById('masterkey-input').value
    if (input) {
        if (input == decrypt(config.get("MasterKey"))) {
            window.location = "index.html"
        } else {
            alert("wrong password")
        }
    } else {
        alert("no input")
    }
}
