"use strict";

/*
    Jani Haiko, 2019
    https://github.com/ojaha065/terveydeksiBackend
*/

const restify = require("restify");

const server = restify.createServer();

const terveydeksi = require("./models/terveydeksi.js");

// Enable queryParser
server.use(restify.plugins.queryParser());

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
server.get("/omatTiedot",(req,res) => {
    if(req.query.id && !isNaN(req.query.id)){
        terveydeksi.haeOmatTiedot(req.query.id,(error,data) => {
            if(!error){
                res.status(200);
                res.send(data);
            }
            else{
                console.error(error);
                res.status(500);
                res.send({
                    reason: 0 // Määrittämätön virhe tietokantayhteydessä
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

server.post("/login",(req,res) => {
    if(req.body && req.body.username && req.body.password){
        terveydeksi.login(req.body.username,req.body.password,(error,status,token) => {
            if(!error){
                if(status){
                    res.status(200);
                    res.send({
                        status: "OK",
                        statusCode: 0,
                        token: token
                    });
                }
                else{
                    res.status(200);
                    res.send({
                        status: "Virheellinen käyttäjätunnus tai salasana",
                        statusCode: 1
                    });
                }
            }
            else{
                console.error(error);
                res.status(500);
                res.send({
                    reason: 0 // Määrittämätön virhe tietokantayhteydessä
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