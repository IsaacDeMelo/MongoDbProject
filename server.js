const express = require('express');
const mongoose = require('mongoose')
const app = express();
const user = require('./models/user');
const characters = require('./models/characters');
let currentUser;

app.set('views', './views')
app.set('view engine', 'ejs');
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

app.post('/register', async (req, res)  => {
    const { name, password, perfil } = req.body;
    const newUser = {
        name: name,
        password: password,
        perfil: perfil
    }
    try {
        await user.create(newUser)
        res.redirect('/');
    } catch (error){
        res.status(500).json({error: error});
    }
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


const uri = 'mongodb+srv://iahfm1:dMFYISY7srCDEwpK@cluster0.xklnmes.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose
    .connect(uri)
    .then(() => {
        console.log('Conectado ao banco!')
        
    })
    .catch((err) => console.log(err));

app.listen(3200);