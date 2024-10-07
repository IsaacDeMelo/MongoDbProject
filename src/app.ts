// src/app.ts
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
import authRoutes from './routes/authRoutes';
import mainRoutes from './routes/mainRoutes';
import articleRoutes from './routes/articleRoutes';
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI || '', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch((error: any) => console.log('Erro ao conectar no MongoDB:', error));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rotas de autenticação
app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);
app.use('/', mainRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
