// src/controllers/authController.ts
import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
import { User } from '../models/userModel';
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Registro de novo usuário
export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário', error });
    }
};

// Login de usuário
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Credenciais inválidas' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).json({ message: 'Login bem-sucedido' });
    } catch (error) {
        res.status(500).json({ message: 'Erro no login', error });
    }
};

// Logout de usuário
export const logout = (req: Request, res: Response) => {
    res.clearCookie('token').json({ message: 'Logout bem-sucedido' });
};
