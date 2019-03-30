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
    if(req.header("origin")){
        res.header("Access-Control-Allow-Origin",req.header("origin"));
        return next();
    }
    else{
        res.status(400);
        res.send({
            reason: 1 // Pyyntö ei sisältänyt tarvittavaa otsaketta
        });
    }
});

// Enable bodyParser
server.use(restify.plugins.bodyParser({
    mapParams: true
}));

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

server.post("/login",(req,res) => {
    if(req.body.username && req.body.password){
        terveydeksi.login(req.body.username,req.body.password,(error,data) => {
            if(!error){
                if(data){
                    res.status(200);
                    res.send({
                        status: "OK",
                        statusCode: 0
                    });
                }
                else{
                    res.status(200);
                    res.send({
                        status: "Wrong username or password",
                        statusCode: 1
                    });
                }
            }
            else{
                console.error(error);
                res.status(500);
                res.send({
                    reason: 0 // Määrittämätön virhe tietokantayhteydessä.
                });
            }
        });
    }
    else{
        res.status(400);
        res.send({
            reason: 2 // Pyyntö ei sisältänyt tarvittavia kenttiä
        });
    }
});

// Starting the server
const port = process.env.PORT || 8000;
server.listen(port,() => {
    console.info(`The server is listening the port ${port}`);
});