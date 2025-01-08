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
exports.ProfileService = void 0;
const UserProfileRepositories_1 = require("../../repositories/implementation/UserProfileRepositories");
const userProfileRepository = new UserProfileRepositories_1.UserProfileRepositories();
class ProfileService {
    changeImage(userId, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('us', userId);
                console.log('us', filePath);
                const updatedUser = yield userProfileRepository.changeImage(userId, filePath);
                return updatedUser;
            }
            catch (error) {
                console.error('Error in ProfileService:', error);
                throw error;
            }
        });
    }
    removeImage(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userProfileRepository.removeImage(userId);
                if (updatedUser) {
                    console.log('User image removed successfully:', updatedUser);
                    return updatedUser;
                }
                else {
                    console.log('User not found or image already removed');
                    return null;
                }
            }
            catch (error) {
                console.error('Error removing image:', error);
                throw new Error('Error removing image');
            }
        });
    }
    changeName(userId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userProfileRepository.changeName(userId, username);
                if (updatedUser) {
                    console.log('User name updated successfully:', updatedUser);
                    return updatedUser;
                }
                else {
                    console.log('User not found or username update failed');
                    return null;
                }
            }
            catch (error) {
                console.error('Error changing name:', error);
                throw new Error('Error changing name');
            }
        });
    }
    addPhone(userId, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userProfileRepository.addNumber(userId, phone);
                if (updatedUser) {
                    console.log('Phone Number inserted successfully:', updatedUser);
                    return updatedUser;
                }
                else {
                    console.log('User not found or phone number update failed');
                    return null;
                }
            }
            catch (error) {
                console.error('Error setting phone', error);
                throw new Error('Error changing phone');
            }
        });
    }
    addAddress(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield userProfileRepository.addAddress(formData);
                return updatedUser;
            }
            catch (error) {
                console.error('Error setting address', error);
                throw new Error('Error setting address');
            }
        });
    }
}
exports.ProfileService = ProfileService;
