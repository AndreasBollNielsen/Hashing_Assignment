const generator = require('generate-password');
const bcrypt = require('bcrypt');

encryption = {};

encryption.Salt = async () => {
    // let salt = generator.generate({
    //     length: 10,
    //     numbers: false,
    //     symbols: false,
    //     lowercase: true,
    //     uppercase: true
    // });
    // return salt;

    let salt = bcrypt.genSalt(10);
    return salt;
}

encryption.Encode = async (password) => {


    console.log("encoding: ", password);


    // let key = await encryption.Salt();
    let salt = await encryption.Salt();
    console.log("salt: ", salt)
    return new Promise((resolve, error) => {

        bcrypt.hash(password, salt, (err, hash) => {
            console.log("hashed and salted password: ", hash);

           // return resolve(hash);
            return resolve({
                'Hash': hash,
                'Salt': salt
            });
        })

    });
}

encryption.validatePassword = (password, hashedPassword) => {

     console.log("password compare: " + `password plain: ${password} hashed password: ${hashedPassword}`);
    return new Promise((resolve, error) => {

        bcrypt.compare(password, hashedPassword, (err, hash) => {
            console.log("checked hashresult: ", hash);
            return resolve(hash);
        })

    });
}


module.exports = encryption;