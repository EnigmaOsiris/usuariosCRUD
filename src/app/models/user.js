'use strict'

const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    nick: String,
    nombre: String,
    apellidos: String,
    password: String,
    correo: String,
    rol: String
});

module.exports = mongoose.model('User', userSchema);