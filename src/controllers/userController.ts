import { Request, Response } from 'express';

export class UserController {
    public handleRequest(req: Request, res: Response): void {
        res.send('Olá do TypeScript!');
    }
}

export const userController = new UserController();
