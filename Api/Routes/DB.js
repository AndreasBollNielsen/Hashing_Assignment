const mysql = require('mysql');
const { json } = require('express');



//create connection to datase
const con = mysql.createPool({
    connectionLimit: 100,
    user: 'root',
    database: 'encryption_database',
    host: 'localhost',
    port: '3306',
    password: ''

});

let db = {};


//check if admin credentials is valid
db.GetUser = async (username) => {

    console.log("username: ", username);
   
    let query = "SELECT * FROM user WHERE userName=?";

    return new Promise(
        (resolve, reject) => {
            con.query(query, [username], (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
               
                return resolve(results[0]);
            });
        }
    );
};


//add user to database
db.AddUser = async (username, password,salt) => {

    console.log("username: ", username);
    console.log("password: ", password);
    let query = "CALL AddUser(?,?,?)";

    return new Promise(
        (resolve, reject) => {
            con.query(query, [username, password,salt], (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
               
                return resolve(results);
            });
        }
    );
};


//update user password and salt
db.UpdateLogin = async (username,password,salt) =>{

    let query = "CALL UpdateLogin(?,?,?)";

    return new Promise(
        (resolve, reject) => {
            con.query(query, [username, password,salt], (err, results) => {
                if (err) {
                    console.log("query not working");
                    return reject(err);
                }
               
                return resolve(results);
            });
        }
    );

}


//export methods
module.exports = db;