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
exports.AuthService = void 0;
const UserRepository_1 = require("../../repositories/implementation/UserRepository");
class AuthService {
    constructor() {
        this.userRepositories = new UserRepository_1.UserRepositories();
    }
    userSignup(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.userRepositories.findUserByEmail(email);
                if (existingUser) {
                    console.log("existed already");
                    return { success: false, message: "user already existed" };
                }
                else {
                    const savedDetails = yield this.userRepositories.createUser({
                        username: username,
                        email: email,
                        password: password
                    });
                    return { success: true, message: 'user created' };
                }
            }
            catch (error) {
                console.error('Error in userSignup service:', error);
                return { success: false, message: 'An error occurred during sign-up' };
            }
        });
    }
}
exports.AuthService = AuthService;
