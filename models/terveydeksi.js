"use strict";

const crypto = require("crypto");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

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
        connection.query("SELECT id,username,password FROM users WHERE BINARY username = ?;",[username],(error,data) => {
            let hash = crypto.createHash("sha512").update(password).digest("hex");
            if(data && data[0] && data[0].password){
                if(data[0].password === hash){
                    // Password correct
                    let token = jwt.sign({
                        userID: data[0].id,
                        username: data[0].username
                    },process.env.JWT_SECRET,{
                        expiresIn: "30 days",
                        issuer: "Terveydeksi!"
                    });
                    return callback(error,true,token);
                }
                else{
                    return callback(error,false);
                }
            }
            else{
                return callback(error,null);
            }
        });
    },
    haeOmatTiedot: (id,callback) => {
        connection.query("SELECT etunimi,sukunimi,katuosoite,postinumero,postitoimipaikka,puhelinnumero,email FROM users WHERE id = ?",[id],(error,data) => {
            return callback(error,data);
        });
    }
};