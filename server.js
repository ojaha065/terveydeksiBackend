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
    if(req.query.token){
        terveydeksi.haeOmatTiedot(req.query.token,(error,data) => {
            if(!error){
                res.status(200);
                res.send(data);
            }
            else{
                if(error === "Invalid token"){
                    res.status(403);
                    res.send({
                        reason: 3 // Sinulla ei ole tarvittavaa käyttöoikeutta käyttää tätä ominaisuutta
                    });
                }
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
server.post("/tallennaAjanvaraus",(req,res) => {
    if(req.body && req.body.token && req.body.yritysID && !isNaN(req.body.yritysID) && req.body.timestamp && !isNaN(req.body.timestamp)){
        terveydeksi.tallennaAjanvaraus(req.body.token,req.body.yritysID,req.body.timestamp,(returnCode) => {
            switch(returnCode){
                case 0:
                    res.status(403);
                    res.send({
                        reason: 3 // Sinulla ei ole tarvittavaa käyttöoikeutta käyttää tätä ominaisuutta
                    });
                    break;
                case 1:
                    res.status(201);
                    res.send();
                    break;
                case 2:
                    res.status(500);
                    res.send({
                        reason: 0 // Määrittämätön virhe tietokantayhteydessä
                    });
                    break;
                default:
                    res.status(500);
                    res.send({
                        reason: 4 // Jokin meni nyt pieleen
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