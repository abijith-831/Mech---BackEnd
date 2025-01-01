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
const authServices_1 = require("../../services/admin/authServices");
const HttpStatus_1 = require("../../enums/HttpStatus");
const authService = new authServices_1.AuthService();
class AuthController {
    adminLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield authService.adminLogin(email, password);
                if (response.success) {
                    res.status(HttpStatus_1.HttpStatus.OK).json({ success: true, message: response.message });
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.UNAUTHORIZED).json({ success: false, message: response.message });
                }
            }
            catch (error) {
                console.error("Error during admin login:", error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: "An error occurred during login" });
            }
        });
    }
}
exports.default = AuthController;
