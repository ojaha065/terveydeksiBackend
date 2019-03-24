"use strict";

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
            callback(error,data);
        });
    }
};