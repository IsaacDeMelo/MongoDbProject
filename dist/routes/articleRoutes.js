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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articleModel_1 = require("../models/articleModel"); // Importando o modelo criado para Article
const { authenticate } = require('../middlewares/authMiddleware');
const router = express_1.default.Router();
router.use(express_1.default.static('public'));
// Rota para exibir a página de criação de artigos
router.get('/teste', authenticate, (req, res) => {
    res.render('article.ejs'); // Formulário de criação de artigos
});
// Rota para criar um novo artigo
router.post('/create', authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, category, images, textSections, author } = req.body;
        console.log(`${title}, ${description}, ${category}, ${images}, ${textSections}, `);
        const newArticle = new articleModel_1.Article({
            title,
            description,
            category,
            author,
            images, // Convertendo string de imagens para array
            textSections
        });
        yield newArticle.save();
        res.status(201).json({ message: 'Artigo criado com sucesso!' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao criar o artigo', error });
    }
}));
router.post('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const article = yield articleModel_1.Article.findOne({ title: title });
        console.log(article);
        res.render('articleDetails.ejs', { article });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao carregar o artigo', error });
    }
}));
// Rota para listar todos os artigos
router.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield articleModel_1.Article.find();
        console.log(articles);
        res.render('articlesList.ejs', { articles }); // Renderiza uma página para listar os artigos
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao listar os artigos', error });
    }
}));
// Rota para exibir um artigo individual
exports.default = router;
