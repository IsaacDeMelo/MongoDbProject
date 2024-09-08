const express = require('express');
const mongoose = require('mongoose');
const app = express();
const user = require('./models/user');
const characters = require('./models/characters');
const comment = require('./models/comment');
let currentUser; // Variável para manter o usuário logado


app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Rota de registro com upload de imagem
app.post('/register', async (req, res) => {
            const { name, password, perfil } = req.body;
            console.log(name, password, perfil)
            const newUser = {
                name: name,
                password: password,
                perfil: perfil, // Armazena o Buffer no campo perfil
                gems: 10,
            };
            try {
                await user.create(newUser);
                console.log(newUser)
                res.redirect('/');
            } catch (error) {
                res.status(500).json({ error: error });
            }
});

// Rota de login
app.post('/', async (req, res)  => {
    const { name, password } = req.body;
    try {
        currentUser = await user.findOne({ name: name, password: password });
        if (currentUser) {
            res.redirect('/home');
        } else {
            res.send('Usuário não encontrado');
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Rota de postagem de comentário
app.post('/post', async (req, res)  => {
    const { name, text } = req.body;
    currentUser = await user.findOne({ name: name });
    let data = new Date();
    const newComment = {
        name: name,
        perfil: currentUser.perfil,  
        text: text,
        data: `Enviado às ${data.getHours() - 3} horas e ${data.getMinutes()} minutos (Horário de Brasília)`
    };
    try {
        await comment.create(newComment);
        res.redirect('/home');
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Rota da página inicial (home)
app.get('/home', async (req, res) => {
    const char = await characters.find({ owner: currentUser.name });
    console.log(currentUser);
    res.render('home', { currentUser: currentUser, char: char });
});

// Rota para exibir o formulário de registro
app.get('/register', (req, res) => {
    res.render('register');
});

// Rota para exibir o formulário de login
app.get('/', (req, res) => {
    res.render('login');
});

// Rota para buscar todos os comentários
app.get('/getComments', async (req, res) => {
    try {
        const comments = await comment.find()
        res.json(comments); // Retorna os comentários com perfis em base64
    } catch (error) {
        res.status(500).json({ error: error.message }); // Trata erros
    }
});

app.get('/getGems', async (req, res) => {
    try {
        const u1 = await user.findOne({ name: currentUser.name });
        if (u1.gems > 0){
            const prizes = ['Hito Hito No Mi: Nika'];
            const prizeIndex = Math.floor(Math.random() * prizes.length);
            const prize = prizes[prizeIndex];
            await user.updateOne({ name: currentUser.name }, { $inc: { gems: -1 } });
            const u2 = await user.findOne({ name: currentUser.name });
            console.log(u2.gems);
            res.json(prize);
        } else {
            res.json(null);
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); // Trata erros
    }
});
app.get('/getCofre', async (req, res) => {
    try{
        const u1 = await user.findOne({ name: currentUser.name });
        res.json(u1.gems);
    } catch(error){
        
    }
    
})

// Conexão com o banco de dados MongoDB
const uri = 'mongodb+srv://iahfm1:dMFYISY7srCDEwpK@cluster0.xklnmes.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao banco de dados MongoDB'))
    .catch(err => console.error('Erro ao conectar ao banco de dados', err));

app.listen(3200, () => {
    console.log('Servidor rodando em http://localhost:3200');
}); 
