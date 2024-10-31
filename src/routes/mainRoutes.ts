import express, { Request, Response } from 'express';
const { authenticate } = require('../middlewares/authMiddleware');
import { Emoji } from '../models/emojiModel';
const router = express.Router();

router.use(express.static('public'));

router.get('/', async (req: Request, res: Response) =>{
    res.render('index.ejs');
});

router.get('/login', async (req:Request, res: Response) =>{
    res.render('login.ejs');
});

router.get('/home', async (req: Request, res: Response) => {
    const token = req.cookies.token;
    try {
        // Busca apenas os emojis com isClicked: false
        const emojis = await Emoji.find({ isClicked: false });
        if (token) {
            res.render('home.ejs', { emojis });  // Passa os emojis para a página
        } else {
            res.render('homeUser.ejs', { emojis });
        }
    } catch (error) {
        console.error("Erro ao buscar emojis:", error);
        res.status(500).send("Erro ao carregar a página");
    }
});

router.get('/premier', async (req:Request, res: Response) =>{
    res.render('premier.ejs');
});

router.post('/click-emoji', async (req: Request, res: Response) => {
    const { emoji } = req.body; // Extrai o nome do emoji do corpo da requisição

    try {
        // Encontra e apaga o emoji pelo nome
        const deletedEmoji = await Emoji.findOneAndDelete({ name: emoji });

        if (deletedEmoji) {
            res.status(200).send({ message: 'Emoji deletado com sucesso.' });
        } else {
            res.status(404).send({ message: 'Emoji não encontrado.' });
        }
    } catch (error) {
        console.error("Erro ao deletar emoji:", error);
        res.status(500).send("Erro ao deletar o emoji.");
    }
});

// Rota para obter emojis ativos
router.get('/emojis', async (req: Request, res: Response) => {
    try {
        const emojis = await Emoji.find({ isClicked: false }); // Supondo que você tenha o campo isClicked
        res.json(emojis);
    } catch (error) {
        console.error("Erro ao buscar emojis:", error);
        res.status(500).send("Erro ao buscar emojis.");
    }
});


export default router;