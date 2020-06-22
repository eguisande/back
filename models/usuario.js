var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Este campo es requerido']
    },
    apellido: {
        type: String,
        required: [true, 'Este campo es requerido']
    },
    password: {
        type: String,
        required: [true, 'Este campo es requerido']
    },
    rol: {
        type: String,
        required: true,
        default: 'USER_ROL'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Este campo es requerido']
    }
});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    delete userObject.password;

    return userObject;
}

module.exports = mongoose.model('Usuario', usuarioSchema);