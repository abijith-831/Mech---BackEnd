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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileRepositories = void 0;
const userModel_1 = __importDefault(require("../../models/user/userModel"));
class UserProfileRepositories {
    changeImage(userId, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userModel_1.default.findByIdAndUpdate(userId, { image: filePath }, { new: true });
                return updatedUser;
            }
            catch (error) {
                console.error('Error updating image in UserProfileRepositories:', error);
                throw error;
            }
        });
    }
    removeImage(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userModel_1.default.findByIdAndUpdate(userId, { image: null }, { new: true });
                return updatedUser;
            }
            catch (error) {
                console.error('Error removing image in UserProfileRepositories:', error);
                throw error;
            }
        });
    }
    changeName(userId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userModel_1.default.findByIdAndUpdate(userId, { username }, { new: true });
                return updatedUser;
            }
            catch (error) {
                console.error('Error updating username in UserProfileRepositories:', error);
                throw error;
            }
        });
    }
    addNumber(userId, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: { phone: phone } }, { new: true });
                if (!updatedUser) {
                    throw new Error('User not found');
                }
                return updatedUser;
            }
            catch (error) {
                console.error('Error updating user phone:', error);
                return null;
            }
        });
    }
    addAddress(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('form', formData);
                const updatedUser = yield userModel_1.default.findByIdAndUpdate(formData.userId, {
                    $push: {
                        addresses: formData,
                    },
                }, { new: true });
                return updatedUser;
            }
            catch (error) {
                console.error("Error adding address:", error);
                throw error;
            }
        });
    }
}
exports.UserProfileRepositories = UserProfileRepositories;
