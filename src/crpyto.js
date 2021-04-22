const editjsonfile = require("edit-json-file")
const crypto = require('crypto')
const username = require("os").userInfo().username
const fs = require("fs")
let config = editjsonfile(`/home/${username}/.config/upm/secretkey`, {autosave: true})

const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

const generateSecretkey = () => {
    char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var pass = ''

    for (var x = 0; x < 32; x++) {
        var i = Math.floor(Math.random() * char.length)
        pass += char.charAt(i)
    }

    return pass
}


if (!fs.existsSync(`/home/${username}/.config/upm/secretkey`)) {
    fs.mkdirSync(`/home/${username}/.config/upm`)
    config.set("secretkey", generateSecretkey())
    process.exit()
}

const secretKey = config.get("secretkey")

const encrypt = (text) => {

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

module.exports = {
    encrypt,
    decrypt
};
