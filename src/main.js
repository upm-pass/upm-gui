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

const generate = length => {
    char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%*=';
    var pass = '';
    
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * char.length);
        pass += char.charAt(i);
    }

    return pass
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
                <button onclick="change('${domain}')" id="change">change</button>
                <button onclick="remove('${domain}')" id="remove">remove</button>
            </div>
            <br>
            <div class="br"></div>
        `

        container.innerHTML += element;
    }
}

function add ()
{
    element = `
        <div id="prompt">
            <div id="inputs">
            <input id="add-domain" type="text" placeholder="domain">
            <input id="add-username" type="text" placeholder="username">
            <input id="add-email" type="text" placeholder="email">
            <input id="add-password" type="text" placeholder="password">
            
            <div id="buttons">
                <button onclick="done('add', null)" id="done">done</button>
                <button onclick="cancel()" id="cancel">cancel</button>
            </div>
        </div>
    `
    document.getElementById("main").classList.add("blurred")
    document.body.innerHTML += element
}



function cancel () 
{
    document.getElementById("main").classList.remove("blurred")
    document.getElementById("prompt").remove()
}

function show (key) 
{
    alert(decrypt(config.get(`passwords.${key}.password`)))
}

function change (key) 
{
    element = `
        <div id="prompt">
            <div id="inputs">
            <input id="change-username" type="text" placeholder="username">
            <input id="change-email" type="text" placeholder="email">
            <input id="change-password" type="text" placeholder="password">
            
            <div id="buttons">
                <button onclick="done('change', '${key}')" id="done">done</button>
                <button onclick="cancel()" id="cancel">cancel</button>
            </div>
        </div>
    `
    document.getElementById("main").classList.add("blurred")
    document.body.innerHTML += element

    document.getElementById(`change-username`).value = decrypt(config.get(`passwords.${key}.username`))
    document.getElementById(`change-email`).value = decrypt(config.get(`passwords.${key}.email`))
    document.getElementById(`change-password`).value = decrypt(config.get(`passwords.${key}.password`))
}

function remove (key)
{
    config.unset(`passwords.${key}`)
    Reload()
}

function done (form, key)
{
    let domain = form == 'add' ? document.getElementById(`add-domain`).value : key
    let username = document.getElementById(`${form}-username`).value
    let email = document.getElementById(`${form}-email`).value
    let password = document.getElementById(`${form}-password`).value
    let save = true

    if (!username && !email) {
        alert(`error: username, email field is empty`)
        save = false
    }

    if (save) {
        if (username) {
            config.set(`passwords.${domain}.username`, encrypt(username))
        }
        if (email) {
            config.set(`passwords.${domain}.email`, encrypt(email))
        }
        if (password) {
            config.set(`passwords.${domain}.password`, encrypt(password))
        } else {
            length = Math.floor(Math.random() * 38) + 17
            config.set(`passwords.${domain}.password`, encrypt(generate(length)))
        }
    }
    Reload()
}

LoadPasswords()