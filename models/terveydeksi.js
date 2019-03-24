"use strict";

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 49453,
    user: "azure",
    password: "6#vWHD_$",
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