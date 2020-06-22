var express = require('express');
var app = express();

// Imports Routes
app.use(require("./usuarios"));
app.use(require("./login"));



module.exports = app;