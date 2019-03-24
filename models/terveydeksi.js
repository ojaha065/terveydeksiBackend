"use strict";

const mysql = require("mysql");

// Let's parse the Azure MySQL connection string
const connectionString = process.env.MYSQLCONNSTR_localdb.split(";");

const connection = mysql.createConnection({
    host: connectionString[1].split("=")[1],
    user: connectionString[2].split("=")[1],
    password: connectionString[3].split("=")[1],
    database: "terveydeksi"
});
connection.connect();

module.exports = {
    haeYritykset: (callback) => {
        connection.query("SELECT * FROM yritykset",(error,result) => {
            if(!error){
                return callback(result);
            }
            else{
                throw error;
            }
        });
    }
};