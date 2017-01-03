global.Promise = require('bluebird');
const assignUser = require('./middlewares/isLoggedIn');

var bodyParser = require('body-parser')
var express = require('express');
var app = express();
var server = app.listen(4242, function() {
    console.log("server started on port 4242");
});
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {
    var token = socket.request._query.token;
    socket.token = token;
    socket.on('data', function(data) {
        io.emit('test', {coucou: true})
    })
});


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use(bodyParser.json());
app.use("/", assignUser);

// Routes
app.post("/api/v1/login", require('./routes/login'));
app.post("/api/v1/register", require('./routes/register'));
app.get("/api/v1/users", require('./routes/getUsers'));
app.get("/api/v1/users/:id", require('./routes/getUsersById'));
app.post("/api/v1/users/:id/enroleMoustiques", require('./routes/enroleMoustiques'))
app.get("/api/v1/users/:id/fireMoustiques/:moustiqueId", require('./routes/fireMoustiques'))
app.post("/api/v1/users/:id/setMap", require('./routes/setMap'))


// INIT GAME
var blood = require('./utils/updateBlood')(io);
