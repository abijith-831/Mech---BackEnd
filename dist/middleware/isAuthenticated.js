"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpStatus_1 = require("../enums/HttpStatus");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        console.log(token, 'token');
        if (!token) {
            res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: "Access denied. No token provided" });
            return;
        }
        const newToken = token.split(' ')[1];
        console.log(newToken, 'token in doctor auth middleware');
        const secret = process.env.JWT_ACESSTOKEN;
        console.log(secret, 'secret in');
        if (!secret) {
            throw new Error('Access token secret is not defined');
        }
        jsonwebtoken_1.default.verify(newToken, secret, (err, payload) => {
            if (err) {
                res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
                return;
            }
            req.user = payload;
            next();
        });
    }
    catch (error) {
        console.error('Error occurred in authenticateToken middleware', error);
        res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while authenticating' });
    }
};
exports.default = authenticateToken;
