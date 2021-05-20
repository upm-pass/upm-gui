const editJsonFile = require("edit-json-file");
const { encrypt, decrypt } = require("../lib/crpyto")
const { config } = require("../../config")

document.getElementById("masterkey-input").focus()
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
