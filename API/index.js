'use strict';
const express = require('express');
const routes = require('./routes')
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.use('/',routes());

app.use( '/', require('./routes/index'));

const PORT = process.env.PORT ||4011;

app.listen(PORT,()=>{
    console.log('Server running....');
   
 });