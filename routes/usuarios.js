const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { authToken, adminRole } = require('../middlewares/auth');




const app = express();

// ===================================================
// Obtener usuario
// ===================================================

app.get('/usuarios', authToken, (req, res, next) => {

    Usuario.find({}, (err, data) => {

        if (err) {
            res.status(500).json({
                ok: false,
                mensaje: 'Error en DB',
                errores: err
            });
        }

        res.status(200).json({
            ok: true,
            users: data
        });

    });


});


// ===================================================
// Crear usuario
// ===================================================


app.post('/usuarios', [authToken, adminRole], (req, res) => {

    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol,
        email: body.email
    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al guardar usuario',
                errores: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });


    });

});



// ===================================================
// Actualizar usuario
// ===================================================


app.put('/usuarios/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'El usuario no existe',
                errores: err
            });
        }

        if (!user) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id' + id + ' no existe',
                errores: { messege: "El usuario con ese ID no existe" }
            });

        }

        user.nombre = body.nombre;
        user.apellido = body.apellido;
        user.email = body.email;
        user.rol = body.rol;

        user.save((err, userSave) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al actualizar el usuario',
                    errores: err
                });
            }

            res.status(200).json({
                ok: true,
                user: userSave
            });

        });

    });

});


app.delete('/usuario/:id', (req, res) => {
    var id = req.params.id;


    Usuario.findByIdAndRemove(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'El usuario no pudo borrarse',
                errores: err
            });
        }


        res.status(200).json({
            ok: true,
            user: user
        });



    })
});


module.exports = app;