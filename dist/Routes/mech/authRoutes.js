"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../controllers/mechController/authController"));
const mechAuth_route = express_1.default.Router();
const authController = new authController_1.default();
mechAuth_route.post('/register', authController.register);
exports.default = mechAuth_route;
