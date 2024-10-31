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
const { authenticate } = require('../middlewares/authMiddleware');
const emojiModel_1 = require("../models/emojiModel");
const router = express_1.default.Router();
router.use(express_1.default.static('public'));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('index.ejs');
}));
router.get('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('login.ejs');
}));
router.get('/home', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    try {
        // Busca apenas os emojis com isClicked: false
        const emojis = yield emojiModel_1.Emoji.find({ isClicked: false });
        if (token) {
            res.render('home.ejs', { emojis }); // Passa os emojis para a página
        }
        else {
            res.render('homeUser.ejs', { emojis });
        }
    }
    catch (error) {
        console.error("Erro ao buscar emojis:", error);
        res.status(500).send("Erro ao carregar a página");
    }
}));
router.get('/premier', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('premier.ejs');
}));
router.post('/click-emoji', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emoji } = req.body; // Extrai o nome do emoji do corpo da requisição
    try {
        // Encontra e apaga o emoji pelo nome
        const deletedEmoji = yield emojiModel_1.Emoji.findOneAndDelete({ name: emoji });
        if (deletedEmoji) {
            res.status(200).send({ message: 'Emoji deletado com sucesso.' });
        }
        else {
            res.status(404).send({ message: 'Emoji não encontrado.' });
        }
    }
    catch (error) {
        console.error("Erro ao deletar emoji:", error);
        res.status(500).send("Erro ao deletar o emoji.");
    }
}));
// Rota para obter emojis ativos
router.get('/emojis', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emojis = yield emojiModel_1.Emoji.find({ isClicked: false }); // Supondo que você tenha o campo isClicked
        res.json(emojis);
    }
    catch (error) {
        console.error("Erro ao buscar emojis:", error);
        res.status(500).send("Erro ao buscar emojis.");
    }
}));
exports.default = router;
