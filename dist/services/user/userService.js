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
exports.UserService = void 0;
const UserRepository_1 = require("../../repositories/implementation/UserRepository");
class UserService {
    constructor() {
        this.userRepositories = new UserRepository_1.UserRepositories();
    }
    userProfile(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepositories.findUserByEmail(email);
            return user;
        });
    }
    updateProfile(updateddata) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, id } = updateddata;
            return yield this.userRepositories.updateProfile(id, updateddata);
        });
    }
    getProfileData(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepositories.findUserById(userId);
        });
    }
}
exports.UserService = UserService;
