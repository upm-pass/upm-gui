const editJsonFile = require("edit-json-file");
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