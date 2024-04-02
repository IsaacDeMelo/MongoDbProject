const mongoose = require('mongoose');

const characters = mongoose.model('Characters', {
    name: String,
    perfil: String,
    owner: String,
    raca: String,
    fisico: Number,
    resistencia: Number,
    agilidade: Number, 
    magia: Number, 
    coragem: Number,
})

module.exports = characters;