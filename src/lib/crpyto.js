const crypto = require('crypto')
const username = require("os").userInfo().username
const fs = require("fs")
const { secretkey } = require("../../config")


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

var secretkey_path = process.platform == "win32" ? `${process.env.APPDATA}/upm-gui/secretkey` : `/home/${require("os").userInfo().username}/.config/upm/secretkey`

if (!fs.existsSync(secretkey_path)) {
    // if (!is_windows) {
    //     fs.mkdirSync(`/home/${username}/.config/upm`)        
    // }
    secretkey.set("secretkey", generateSecretkey())
    process.exit()
}

const secretKey = secretkey.get("secretkey")

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
