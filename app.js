global.Promise = require('bluebird');
var assignUser = require('./middlewares/isLoggedIn');
var express = require('express');
var app = module.exports = express();
// TO CONNECT TO DB :
// 1 : su - moustico
// 2 :  psql -d moustico -U moustico


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use("/api/v1", assignUser);

// Routes

/*Fiter*/
app.post("/api/v1/login", require('./routes/login'));
app.post("/api/v1/register", require('./routes/register'));
app.get("/api/v1/createMousticoHouse", require('./routes/createMousticoHouse'));
