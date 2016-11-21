global.Promise = require('bluebird');
var express = require('express');
var app = module.exports = express();



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});


// Routes

/*Fiter*/
app.post("/api/v1/login", require('./routes/login'));
