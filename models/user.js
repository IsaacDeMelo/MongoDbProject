const mongoose = require('mongoose');

const user = mongoose.model('User', {
    name: String,
    password: String,
    perfil: String
})

module.exports = user;