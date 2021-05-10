const editJsonFile = require("edit-json-file");
const { encrypt, decrypt } = require("../crpyto")
let config_file = editJsonFile(`/home/senpai/.config/upm/config`, {autosave: true})
let config = editJsonFile(config_file.get("upm_path"), {autosave: true})

document.getElementById("remove-all").addEventListener("click", RemoveAll);
document.getElementById("search-icon").addEventListener("click", search);
document.getElementById("search").addEventListener("keyup", ({key}) => {
    if (key == "Enter")
        search()
})

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

function CreatePasswordElement (domain)
{
    let username = config.get(`passwords.${domain}.username`) != undefined ? decrypt(config.get(`passwords.${domain}.username`)) : "empty"
    let email = config.get(`passwords.${domain}.email`) != undefined ? decrypt(config.get(`passwords.${domain}.email`)) : "empty"
    let password = config.get(`passwords.${domain}.password`) != undefined ? decrypt(config.get(`passwords.${domain}.password`)) : "empty"
    
    return element = `
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

function search ()
{
    let search_key_word = document.getElementById("search").value
    
    if (search_key_word) {
        if (config.get(`passwords.${search_key_word}`)) {
            document.getElementById("passwords").innerHTML = ""
            document.getElementById("passwords").innerHTML += CreatePasswordElement(search_key_word)
        } else {
            alert("no domain with the name: " + search_key_word)
        }
    } else {
        alert("search form is empty!")
    }
}

function LoadPasswords () 
{
    let data = config.get("passwords")
    var container = document.getElementById("passwords");

    // console.log(data);

    for (var key in data) {
        container.innerHTML += CreatePasswordElement(key);
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
    element = `
        <div style="height: 100px;" id="prompt">
            <input id="prompt-password" onclick="this.select()" value="${decrypt(config.get(`passwords.${key}.password`))}"></input>
            
            <div id="buttons">
            <button onclick="cancel()" id="cancel">cancel</button>
            </div>
        </div>
    `
    document.getElementById("main").classList.add("blurred")
    document.body.innerHTML += element
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

    document.getElementById(`change-username`).value = config.get(`passwords.${key}.username`) != undefined ? decrypt(config.get(`passwords.${key}.username`)) : null
    document.getElementById(`change-email`).value = config.get(`passwords.${key}.email`) != undefined ? decrypt(config.get(`passwords.${key}.email`)) : null
    document.getElementById(`change-password`).value = config.get(`passwords.${key}.password`) != undefined ? decrypt(config.get(`passwords.${key}.password`)) : null
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