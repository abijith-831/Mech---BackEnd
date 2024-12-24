"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../../controllers/userController/authController"));
const userAuth_route = express_1.default.Router();
const authController = new authController_1.default();
userAuth_route.post('/signup', authController.signUp);
userAuth_route.post("/verifyOtp", authController.verifyOtp);
userAuth_route.post('/resendotp', authController.resendOtp);
userAuth_route.post('/login', authController.login);
userAuth_route.post('/forgetpass', authController.forgetPass);
userAuth_route.post('/resetPass', authController.resetPass);
userAuth_route.get('/logout', authController.logout);
exports.default = userAuth_route;
