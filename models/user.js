const mongoose = require('mongoose');

const user = mongoose.model('User', {
    name: String,
    password: String,
    perfil: String,
    gems: Number,
});

module.exports = user;