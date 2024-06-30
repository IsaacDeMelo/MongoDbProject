const mongoose = require('mongoose');

const comment = mongoose.model('Comment', {
    name: String,
    perfil: String,
    text: String,
    data: String,
})

module.exports = comment;