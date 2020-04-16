'use strict'

const mongoose = require('mongoose');
const rolSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String
});

module.exports = mongoose.model('Rol', rolSchema);