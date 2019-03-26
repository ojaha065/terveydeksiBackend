"use strict";

/*
    Jani Haiko, 2019
    https://github.com/ojaha065/terveydeksiBackend
*/

const restify = require("restify");

const server = restify.createServer();

const terveydeksi = require("./models/terveydeksi.js");

// Allow CORS
server.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin",req.get("origin"));
});

// Routes
server.get("/",(req,res) => {
    res.status(200);
    res.send({
        message: "Nothing to see here."
    });
});
server.get("/yritykset",(req,res) => {
    terveydeksi.haeYritykset((error,data) => {
        if(!error){
            res.status(200);
            res.send(data);
        }
        else{
            console.error(error);
            res.status(500);
            res.send({
                reason: 0 // Määrittämätön virhe tietokantayhteydessä.
            });
        }
    });
});

// Starting the server
const port = process.env.PORT || 8000;
server.listen(port,() => {
    console.info(`The server is listening the port ${port}`);
});