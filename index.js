const express =  require("express");
//import express from "express";
const fs = require("fs");

var app = express();
const PORT = 8080;
let contadorItems = 0;
let contadorItem = 0;



app.get("/items",function(req,res,next){
  (async function(){
    try{
      let prodParse = JSON.parse(await fs.promises.readFile("./productos.txt"));
      var arrProd = {
        productos: prodParse,
        cantidad: prodParse.length
      }
      contadorItems++
      res.json(arrProd)
    }catch(err){
      throw new Error("no se pudo leer el archivo")
    }
  })()
})


app.get("/item-random", function(req,res,next){
  (async function(){
    try{
      let prodParse = JSON.parse(await fs.promises.readFile("./productos.txt"));
      var arrProd = {
        productos: prodParse[Math.floor(Math.random() * prodParse.length)],
      }
      contadorItem++
      res.json(arrProd)
    }catch(err){
      throw new Error("no se pudo leer el archivo")
    }
  })()
})

app.get("/visitas", function(req,res,next){
  res.json({items: contadorItems, item: contadorItem})
})

const server = app.listen(PORT, ()=>{
  console.log("servidor escuchando en el puerto " + PORT);
})

server.on("error", (error)=>{ console.log(error)})
