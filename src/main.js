const editJsonFile = require("edit-json-file");
const { encrypt, decrypt } = require("../crpyto")
let config = editJsonFile(`/home/senpai/.upm`, {autosave: true})

document.getElementById("remove-all").addEventListener("click", RemoveAll);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Reload () {
    location.reload()
}

function RemoveAll () 
{
    const oldValue = document.getElementById('remove-all').innerHTML
    config.unset("passwords")
    sleep(100).then(() => {
        document.getElementById('remove-all').innerHTML = 'done'
    })
    sleep(1000).then(() => {
        document.getElementById('remove-all').innerHTML = oldValue
    }) 
    Reload()
}

function LoadPasswords () 
{
    let data = config.get("passwords")
    var count = data.length;
    var container = document.getElementById("passwords");
    var Element;

    // console.log(data);

    for (var key in data) {
        let domain = key
        let username = config.get(`passwords.${key}.username`) != undefined ? decrypt(config.get(`passwords.${key}.username`)) : "empty"
        let email = config.get(`passwords.${key}.email`) != undefined ? decrypt(config.get(`passwords.${key}.email`)) : "empty"
        let password = config.get(`passwords.${key}.password`) != undefined ? decrypt(config.get(`passwords.${key}.password`)) : "empty"
        
        element = `
            <br>
            <div class="psw-elem">
                <div>
                    <span style="padding-left: 2px;">${domain}</span>
                    <span class="text-span">${username}</span>
                    <span class="text-span">${email}</span>
                </div>
                <br>
                <span id="password">*****</span>
                <button onclick="show('${domain}')" id="show">show</button>
                <button id="change">change</button>
                <button onclick="remove('${domain}')" id="remove">remove</button>
            </div>
            <br>
            <div class="br"></div>
        `

        container.innerHTML += element;
    }
}

function show (key) 
{
    alert(decrypt(config.get(`passwords.${key}.password`)))
}

function remove (key)
{
    config.unset(`passwords.${key}`)
    Reload()
}



LoadPasswords()