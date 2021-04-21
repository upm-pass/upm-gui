const editJsonFile = require("edit-json-file");
const { encrypt, decrypt } = require("./crpyto")
let config = editJsonFile(`/home/senpai/.upm`, {autosave: true})


document.getElementById("login").addEventListener("click", HandleLogin);

function HandleLogin() {
    let input = document.getElementById('masterkey-input').value
    if (!input) {
        alert("no input")
    } else {
        if (input == decrypt(config.get("MasterKey"))) {
            console.log("logged in")
            window.location = "index.html"
        } else {
            alert("wrong password")
        }
    }
}

// console.log(decrypt(config.get("MasterKey")))