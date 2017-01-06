global.Promise = require('bluebird');
const AuthToken = require('./models/AuthToken');
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

    // HANDLE DATA
    socket.on('data', function(data) {
        io.emit('test', {coucou: true})
    })

    // HANDLE MAP UPDATE
    socket.on('map', async function(data) {
        var authToken = socket.request._query.token;
        let token = await new AuthToken({ token: authToken }).fetch({withRelated:['user']});
        if (token && token.related('user') && token.related('user').has('id')) {
            var user = token.related('user')
            await user.setMap(JSON.stringify(data));
            socket.emit('mapUpdate');
        }
    })

    // HANDLE MOUSTIQUE BUY
    socket.on('enrole', async function(data) {
        data.number -= 1; // WTF BUG
        var authToken = socket.request._query.token;
        let token = await new AuthToken({ token: authToken }).fetch({withRelated:['user']});
        if (token && token.related('user') && token.related('user').has('id')) {
            let user = token.related('user')
            let number = data.number;
            let level = data.level;
            var moustiques = await user.enroleMoustiques(number, level);

            if (!moustiques) {
              socket.emit('enroleFail');
            } else {
              socket.emit('enroleUpdate', {liste: moustiques, number: moustiques.length});
            }
        }
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
