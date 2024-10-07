"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const mainRoutes_1 = __importDefault(require("./routes/mainRoutes"));
const articleRoutes_1 = __importDefault(require("./routes/articleRoutes"));
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI || '', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch((error) => console.log('Erro ao conectar no MongoDB:', error));
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Rotas de autenticação
app.use('/auth', authRoutes_1.default);
app.use('/articles', articleRoutes_1.default);
app.use('/', mainRoutes_1.default);
// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
