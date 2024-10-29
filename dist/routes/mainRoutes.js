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
const router = express_1.default.Router();
router.use(express_1.default.static('public'));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('index.ejs');
}));
router.get('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('login.ejs');
}));
router.get('/home', (req, res) => {
    const token = req.cookies.token;
    if (token) {
        res.render('home.ejs');
    }
    else {
        res.render('homeUser.ejs');
    }
});
router.get('/premier', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render('premier.ejs');
}));
exports.default = router;
