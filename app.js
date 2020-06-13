// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Import Routes

var userRoute = require("./routes/usuarios");

// Inicializar variables
var app = express();

// Body Parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// CNX

mongoose.connection.openUri('mongodb://localhost:27017/service', (err, res) => {
    if (err) throw err;
    console.log('Server corriendo \x1b[32m%s\x1b[0m', 'Online');
});


app.use('/usuarios', userRoute);

// Listen express

app.listen(3000, () => {
    console.log('Express server corriendo \x1b[32m%s\x1b[0m', 'Online');
});