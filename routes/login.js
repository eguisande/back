const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const app = express();

app.post('/login', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, user) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }


        if (!user) {
            return res.status(400).json({
                ok: false,
                message: "(Usuario) o contraseña invalidos"
            });
        }

        let compPass = bcrypt.compareSync(body.password, user.password);

        if (!compPass) {
            return res.status(400).json({
                ok: false,
                message: "Usuario o (contraseña) invalidos"
            });
        }

        let token = jwt.sign({
                usuario: user
            },
            process.env.SEEDTOKEN, {
                expiresIn: process.env.CADTOKEN
            })

        res.json({
            ok: true,
            usuario: user,
            token
        })

    });

});



module.exports = app;