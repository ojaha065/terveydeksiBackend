"use strict";

/*
    Jani Haiko, 2019
*/

const restify = require("restify");

const server = restify.createServer();

// Routes
server.get("/",(req,res) => {
    res.status(200);
    res.send({
        message: "Nothing to see here."
    });
});

// Starting the server
const port = process.env.PORT || 8000;
server.listen(port,() => {
    console.info(`The server is listening the port ${port}`);
});