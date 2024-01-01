const express = require('express');
const dotenev = require("dotenv");
const connect = require('./configs/db');
const app = require("./index");

dotenev.config();

const port = process.env.PORT_NUMBER || 8000;

app.listen(port,async ()=>{
    console.log('listening to port hello guys',port);
     await connect();
})
