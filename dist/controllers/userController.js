"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
class UserController {
    handleRequest(req, res) {
        res.send('Olá do TypeScript!');
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
