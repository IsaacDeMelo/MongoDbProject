const mongoose = require('mongoose');

const user = mongoose.model('User', {
    name: String,
    password: String,
    perfil: String,
    image: { data: Buffer, contentType: String } // Armazenamento como Buffer
})

module.exports = user;