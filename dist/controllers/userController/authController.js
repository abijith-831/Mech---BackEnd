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
                const { username, email, password } = req.body;
                const response = yield authService.userSignup(username, email, password);
                if (!response.success) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(response);
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ success: true,
                        message: "user Registered successfully",
                        user: response.user
                    });
                }
            }
            catch (error) {
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const response = yield authService.verifyUserOtp(data);
                if (typeof response === "string") {
                    res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: response });
                    return;
                }
                else if (response === null || response === void 0 ? void 0 : response.success) {
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ message: response });
                    return;
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(response);
                    return;
                }
            }
            catch (error) {
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "otp verification failed" });
                return;
            }
        });
    }
    resendOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const response = yield authService.resendOtp(data);
                if (typeof response === 'string') {
                    res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: response });
                    return;
                }
                if (response === null || response === void 0 ? void 0 : response.success) {
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ message: response });
                    return;
                }
            }
            catch (error) {
                console.log('error in otp controller ', error);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const userData = req.body;
            try {
                const response = yield authService.userLogin(userData);
                if (response.success) {
                    res.status(HttpStatus_1.HttpStatus.CREATED).cookie('refreshToken', response.refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 7 * 24 * 60 * 1000 })
                        .json({ success: true,
                        message: response.message,
                        data: {
                            username: (_a = response.data) === null || _a === void 0 ? void 0 : _a.username,
                            email: (_b = response.data) === null || _b === void 0 ? void 0 : _b.email
                        },
                        accessToken: response.accessToken });
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(response);
                }
            }
            catch (error) {
                console.error('Error during login:', error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: 'Something went wrong during login. Please try again later.',
                });
            }
        });
    }
    forgetPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const response = yield authService.forgetPass(data);
                console.log(response, 'k');
                if (!response.success) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(response);
                }
                else {
                    console.log("hhiiiiiiii");
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ response });
                }
            }
            catch (error) {
                console.log('error occur in forget pass', error);
            }
        });
    }
    resetPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield authService.resetPass(req.body);
                if (!response.success) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(response);
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ response });
                }
            }
            catch (error) {
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('control');
                res.clearCookie('refreshToken');
                res.json({ message: 'Successfully Logged Out' });
                return;
            }
            catch (error) {
                console.log('error in user logout controller', error);
            }
        });
    }
}
exports.default = AuthController;
