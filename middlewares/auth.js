// import JWT
const jwt = require('jsonwebtoken');

// Auth token

let authToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEEDTOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};


let adminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.rol !== "ADMIN_ROL") {
        return res.status(401).json({
            ok: false,
            rol: 'No posee autorización'
        });

    } else {
        next();
    }

};

module.exports = {
    authToken,
    adminRole
};