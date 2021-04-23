const editJsonFile = require("edit-json-file");
const { encrypt, decrypt } = require("../crpyto")
let config = editJsonFile(`/home/senpai/.upm`, {autosave: true})

document.getElementById("remove-all").addEventListener("click", RemoveAll);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  

function RemoveAll () {
    const oldValue = document.getElementById('remove-all').innerHTML
    config.unset("passwords")
    sleep(100).then(() => {
        document.getElementById('remove-all').innerHTML = 'done'
    })
    sleep(1000).then(() => {
        document.getElementById('remove-all').innerHTML = oldValue
    })
}

function LoadPasswords () 
{
    let data = config.get("passwords")
    var count = data.length;
    var container = document.getElementById("passwords");
    var Element;

    // console.log(data);

    for (var key in data) {
        // if (data.hasOwnProperty(key)) {
            console.log(key + " -> " + data[key])
            console.log(decrypt(config.get(`passwords.${key}.password`)))
        // }
    }

    // for (var i = 0; i < count; i++) {
    //     var item = data[i];
    //     Element = ``
        
    //     container.innerHTML += Element;
    // }
}

LoadPasswords()