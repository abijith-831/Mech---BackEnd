"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../controllers/adminController/authController"));
const authController = new authController_1.default();
const adminAuth_route = express_1.default.Router();
adminAuth_route.post('/login', authController.adminLogin);
exports.default = adminAuth_route;
