"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const jwt = require('jsonwebtoken');
const userModel_1 = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
// Registro de novo usuário
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const user = new userModel_1.User({ username, email, password });
        yield user.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
});
exports.register = register;
// Login de usuário
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: 'Usuário não encontrado' });
        const isMatch = yield user.comparePassword(password);
        if (!isMatch)
            return res.status(400).json({ message: 'Credenciais inválidas' });
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).json({ message: 'Login bem-sucedido' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro no login', error });
    }
});
exports.login = login;
// Logout de usuário
const logout = (req, res) => {
    res.clearCookie('token').json({ message: 'Logout bem-sucedido' });
};
exports.logout = logout;
