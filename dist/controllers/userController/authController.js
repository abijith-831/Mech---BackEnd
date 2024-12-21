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
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = require("../../services/user/authService");
const HttpStatus_1 = require("../../enums/HttpStatus");
const authService = new authService_1.AuthService();
class AuthController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { fullName, email, password } = req.body;
                const response = yield authService.userSignup(fullName, email, password);
                if (!response.success) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(response);
                }
                else {
                    console.log("hhiiiiiiii");
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ success: true, message: "user Registered successfully" });
                }
            }
            catch (error) {
                console.error("Error during signup:", error);
                res.status(500).json({ success: false, message: 'Server error' });
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                console.log('data', data);
                // const response = await authService.verifyUserOtp(data);
            }
            catch (error) {
            }
        });
    }
}
exports.default = AuthController;
