//cu require includem pachetele folosite in proiect
const express = require('express');
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const {Client} =require('pg');
const url = require('url');

const { exec } = require("child_process");
const ejs=require('ejs');
const regex=require('regex');

const app = express();


const client = new Client({
    host: 'localhost',
    user: 'alex',
    password: 'alex',
    database: 'TW',
    port:5432
})
client.connect()

app.set("view engine", "ejs");
console.log("Dirname: ", __dirname);
app.use("/resurse", express.static(path.join(__dirname, "resurse")));


//index
app.get(["/","/index"], function(req, res){ 
    res.render("pagini/index");
});

//reviste
app.get("/reviste",function(req, res){
     client.query("select * from reviste", function(err,rez){
         console.log(rez);
         res.render("pagini/reviste", {produse:rez.rows});
     });
     
 });


//404
app.get("/*",function(req, res){    
    res.render("pagini"+req.url, function(err,rezultatRandare){
        if(err){
            if(err.message.includes("Failed to lookup view")){
                res.status(404).render("pagini/404");
            }
            else 
                throw err;
        }
        else{
            res.send(rezultatRandare);
        }
    });
});




app.listen(8080);
console.log("A pornit server-ul!");
