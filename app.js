global.Promise = require('bluebird');
var assignUser = require('./middlewares/isLoggedIn');
var express = require('express');
var app = module.exports = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});
app.use("/api/v1", assignUser);

// Routes
app.post("/api/v1/login", require('./routes/login'));
app.post("/api/v1/register", require('./routes/register'));
app.get("/api/v1/createMousticoHouse", require('./routes/createMousticoHouse'));
app.get("/api/v1/users", require('./routes/getUsers'));
app.get("/api/v1/users/:id", require('./routes/getUsersById'));

var blood = require('./utils/updateBlood');
blood.init()
