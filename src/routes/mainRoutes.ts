import express, { Request, Response } from 'express';
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(express.static('public'));

router.get('/', async (req: Request, res: Response) =>{
    res.render('index.ejs');
});

router.get('/login', async (req:Request, res: Response) =>{
    res.render('login.ejs');
});

router.get('/home', (req: Request, res: Response) =>{
    const token = req.cookies.token;
    if (token){
        res.render('home.ejs');
    } else {
        res.render('homeUser.ejs');
    }
})

export default router;