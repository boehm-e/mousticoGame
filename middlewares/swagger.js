var apib2swagger = require('apib2swagger');
var fs = require("fs");
var https = require("https");
var exec = require('child_process').exec;

module.exports = function() {
    if (!fs.existsSync(__dirname + "/../swagger-ui-master/dist")) {
        downloadSwagger(function() {
            console.log("Swagger downloaded");
        });
    }
    var swagger;
    apib2swagger.convert(fs.readFileSync(__dirname + "/../apidoc/README.md", { encoding: 'utf8' }), function(error, result) {
        if (error) throw error;
        swagger = result.swagger;
        console.log("Successfully converted to Swagger");
    });
    return function(request, response, next) {
        var path = request.url.split('?')[0];
        if (path === '/swagger.json') {
            response.statusCode = 200;
            response.write(JSON.stringify(swagger));
            response.end();
        } else if (path === '/doc') {
            response.statusCode = 302;
            response.setHeader('Location', '/doc/index.html?url=/swagger.json');
            response.end();
        } else if (path.indexOf('/doc') === 0) {
            path = path.substr(4);
            var file = __dirname + '/../swagger-ui-master/dist' + path;
            if (!fs.existsSync(file)) {
                response.statusCode = 404;
                response.end();
                return;
            }
            response.statusCode = 200;
            response.write(fs.readFileSync(file));
            response.end();
        } else {
            return next()
        }
    }
};

function downloadSwagger(callback) {
    var swaggerUI = 'https://codeload.github.com/swagger-api/swagger-ui/tar.gz/master';
    var filename = 'swagger-ui-master.tar.gz';
    console.log('Downloading SwaggerUI (' + swaggerUI + ')');
    https.get(swaggerUI, function (res) {
        if (res.statusCode === 200) {
        }
        var w = fs.createWriteStream(filename);
        res.pipe(w);
        res.on('end', function () {
            extract(filename, callback);
        })
    }).on('error', function (e) {
        console.error(e);
    });
}

function extract(filename, callback) {
    console.log('Extracting ' + filename);
    exec('tar xzvf ' + filename, function (err, stdout, stderr) {
        if (err) {
            console.log(stdout);
            console.log(stderr);
            return;
        }
        console.log('Complete!');
        callback();
    });
}
