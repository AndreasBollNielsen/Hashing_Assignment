const generator = require('generate-password');
const bcrypt = require('bcrypt');

encryption = {};

//generate new salt with 10 iterations
encryption.Salt = async () => {
    
    let salt = bcrypt.genSalt(10);
    return salt;
}


//encode password
encryption.Encode = async (password) => {


    let salt = await encryption.Salt();
    console.log("salt: ", salt)
    return new Promise((resolve, error) => {

        bcrypt.hash(password, salt, (err, hash) => {
            console.log("hashed and salted password: ", hash);

           // return hash and salt
            return resolve({
                'Hash': hash,
                'Salt': salt
            });
        })

    });
}


//validate user by comparing the hash strings
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