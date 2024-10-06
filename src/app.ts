// src/app.ts
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
import authRoutes from './routes/authRoutes';
import { authenticate } from './middlewares/authMiddleware';
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

app.get('/', async (req: Request, res: Response) =>{
    res.render('index.ejs');
});
app.get('/login', async (req:Request, res: Response) =>{
    res.render('login.ejs');
});
app.get('/home', authenticate, (req: Request, res: Response) =>{
    res.render('home.ejs');
})
// Rotas de autenticação
app.use('/auth', authRoutes);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
