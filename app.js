var express = require('express');

var app = module.exports.app = exports.app = express(),
    port = 8080;

app.use(express.static('./release'));

app.listen(port);

console.log('Server listens to http://localhost:' + port);