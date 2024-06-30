const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer'); // Middleware para upload de arquivos
const path = require('path');
const fs = require('fs');
const app = express();
const user = require('./models/user');
const characters = require('./models/characters');
const comment = require('./models/comment');
let currentUser;

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: './public/uploads/', // Diretório onde as imagens serão armazenadas
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limite de tamanho do arquivo (opcional)
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profileImage'); // Nome do campo de entrada do formulário para a imagem de perfil

// Função para verificar o tipo do arquivo
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Erro: Apenas são permitidas imagens JPEG, JPG, PNG ou GIF!');
    }
}

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public')); // Servir arquivos estáticos (como imagens) a partir do diretório 'public'

// Rota de registro com upload de imagem
app.post('/register', async (req, res) => {
    upload(req, res, async function(err) {
        if (err) {
            res.status(400).json({ error: err });
        } else {
            const { name, password } = req.body;
            let perfil = ''; // Inicializa com vazio por padrão

            // Verifica se há um arquivo enviado
            if (req.file) {
                perfil = '/uploads/' + req.file.filename; // Caminho da imagem de perfil
            }

            const newUser = {
                name: name,
                password: password,
                perfil: perfil // URL da imagem de perfil
            };

            try {
                await user.create(newUser);
                res.redirect('/');
            } catch (error) {
                res.status(500).json({ error: error });
            }
        }
    });
});
app.post('/', async (req, res)  => {
    const { name, password } = req.body;
    try {
        currentUser = await user.findOne({ name: name, password: password })
        if (currentUser){
            res.redirect('/home');
        } else {
            res.send('Usuário não encontrado')
        }
    } catch (error){
        res.status(500).json({error: error});
    }
});
app.post('/post', async (req, res)  => {
    const { name, text } = req.body;
    let data = new Date();
    const newComment = {
        name: name,
        perfil: currentUser.perfil,  
        text: text,
        data: `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()} (Horário de Brasília)`
    }
    try {
        await comment.create(newComment);
        res.redirect('/home');
    } catch (error){
        res.status(500).json({error: error});
    }
});

app.get('/home', async (req, res) => {
    const char = await characters.find({ owner: currentUser.name });
    console.log(currentUser.name);
    res.render('home', { currentUser: currentUser, char: char });
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/', async (req, res) => {
    res.render('login');
});
app.get('/getComments', async (req, res) => {
    try {
        const comments = await comment.find().lean(); // Busca todos os comentários
        res.json(comments); // Retorna os comentários como resposta JSON
    } catch (error) {
        res.status(500).json({error: error.message}); // Trata erros
    }
});

const uri = 'mongodb+srv://iahfm1:dMFYISY7srCDEwpK@cluster0.xklnmes.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao banco de dados MongoDB'))
    .catch(err => console.error('Erro ao conectar ao banco de dados', err));

app.listen(3200, () => {
    console.log('Servidor rodando em http://localhost:3200');
});