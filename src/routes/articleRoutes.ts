import express, { Request, Response } from 'express';
import { Article } from '../models/articleModel';  // Importando o modelo criado para Article
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(express.static('public'));

// Rota para exibir a página de criação de artigos
router.get('/teste', authenticate, (req: Request, res: Response) => {
    res.render('article.ejs');  // Formulário de criação de artigos
});

// Rota para criar um novo artigo
router.post('/create', authenticate, async (req: Request, res: Response) => {
    try {
        const { title, description, category, images, textSections } = req.body;
        console.log(`${title}, ${description}, ${category}, ${images}, ${textSections}, `)
        const newArticle = new Article({
            title,
            description,
            category,
            images,  // Convertendo string de imagens para array
            textSections
        });
        await newArticle.save();
        res.status(201).json({ message: 'Artigo criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o artigo', error });
    }
});

// Rota para listar todos os artigos
router.get('/list', async (req: Request, res: Response) => {
    try {
        const articles = await Article.find();
        res.render('articlesList.ejs', { articles });  // Renderiza uma página para listar os artigos
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar os artigos', error });
    }
});
export default router;
