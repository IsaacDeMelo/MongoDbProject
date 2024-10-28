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
router.post('/create', async (req: Request, res: Response) => {
    try {
        const { title, description, category, images, textSections, author } = req.body;
        console.log(`${title}, ${description}, ${category}, ${images}, ${textSections}, `)
        const newArticle = new Article({
            title,
            description,
            category,
            author,
            images,  // Convertendo string de imagens para array
            textSections
        });
        await newArticle.save();
        res.status(201).json({ message: 'Artigo criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar o artigo', error });
    }
});

router.post('/search', async (req: Request, res: Response) => {
    try {
        const { title } = req.body; 
        const article = await Article.findOne({ title: title });
        console.log(article);
        res.render('articleDetails.ejs', { article });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao carregar o artigo', error });
    }

})

// Rota para listar todos os artigos
router.get('/list', async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const articles = await Article.find();
        console.log(articles)
        if (token){
            res.render('articlesList.ejs', { articles, token});  // Renderiza uma página para listar os artigos
        } else {
            res.render('articlesList.ejs', { articles });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar os artigos', error });
    }
});

// Rota para listar todos os artigos
router.get('/edit/:title', async (req: Request, res: Response) => {
    const title = req.params.title
    const article = await Article.findOne({ title: title });
    console.log(article);
    console.log(title);
    res.render('articleFormEdit.ejs', { article: article }); 
    /*try { 
        
    } catch (error) {
        res.status(500).json({ message: 'Erro', error });
    }*/
});

router.post('/edit/make', async (req: Request, res: Response) => {
    try {
        const { title, description, category, images, textSections, author } = req.body;
        console.log(`${title}, ${description}, ${category}, ${images}, ${textSections}, `)
        const newArticle = await Article.findOneAndUpdate(
            { title }, 
            {
                title,
                description,
                category,
                author,
                images,  // Convertendo string de imagens para array
                textSections
            },
            { new: true }
        );
        
        res.status(201).json({ message: 'Artigo criado com sucesso!' });
    } catch (error) {
        console.error(error);
    }
    
});
export default router;
