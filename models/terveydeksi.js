"use strict";

const crypto = require("crypto");
const mysql = require("mysql");

// Let's parse the Azure MySQL connection string
const connectionString = process.env.MYSQLCONNSTR_localdb.split(";");
const host = connectionString[1].split("=")[1].split(":");

const connection = mysql.createConnection({
    host: host[0],
    port: host[1],
    user: connectionString[2].split("=")[1],
    password: connectionString[3].split("=")[1],
    database: "terveydeksi"
});
connection.connect();

module.exports = {
    haeYritykset: (callback) => {
        connection.query("SELECT * FROM yritykset",(error,data) => {
            return callback(error,data);
        });
    },
    login: (username,password,callback) => {
        connection.query("SELECT password FROM users WHERE BINARY username = ?",[username],(error,data) => {
            let hash = crypto.createHash("sha512").update(password).digest("hex");
            console.log(data);
            if(data[0]){
                if(data[0] === hash){
                    return callback(error,true);
                }
                else{
                    return callback(error,false);
                }
            }
            else{
                return callback(error,null);
            }
        });
    }
};