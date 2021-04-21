const editJsonFile = require("edit-json-file");
const { encrypt, decrypt } = require("./crpyto")
let config = editJsonFile(`/home/senpai/.upm`, {autosave: true})


document.getElementById("login").addEventListener("click", HandleLogin);

function HandleLogin() {
    let input = document.getElementById('masterkey-input').value
    if (!input) {
        alert("no input")
    } else {
        console.log(input)
    }
}

// console.log(decrypt(config.get("MasterKey")))