"use strict";

/*
    Jani Haiko, 2019
    https://github.com/ojaha065/terveydeksiBackend
*/

const restify = require("restify");

const server = restify.createServer();

const terveydeksi = require("./models/terveydeksi.js");

// Routes
server.get("/",(req,res) => {
    res.status(200);
    res.send({
        message: "Nothing to see here."
    });
});
server.get("/yritykset",(req,res) => {
    terveydeksi.haeYritykset((data) => {
        res.status(200);
        res.send(data);
    });
});

// Starting the server
const port = process.env.PORT || 8000;
server.listen(port,() => {
    console.info(`The server is listening the port ${port}`);
});