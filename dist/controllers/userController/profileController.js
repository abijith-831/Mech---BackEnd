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
const profileServices_1 = require("../../services/user/profileServices");
const profileService = new profileServices_1.ProfileService();
class ProfileController {
    changeImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                const { userId } = req.body;
                if (!file) {
                    res.status(400).json({ message: "No file uploaded!" });
                    return;
                }
                if (!userId) {
                    res.status(400).json({ message: "User ID is required" });
                    return;
                }
                const filePath = file.path;
                const updatedUser = yield profileService.changeImage(userId, filePath);
                if (updatedUser) {
                    res.status(200).json({
                        success: true,
                        message: "Image uploaded successfully!",
                        data: {
                            imageUrl: filePath,
                            user: updatedUser
                        }
                    });
                }
                else {
                    res.status(500).json({
                        success: false,
                        message: "Failed to update user image"
                    });
                }
            }
            catch (error) {
                console.error("Error uploading image:", error);
                res.status(500).json({ message: "Error uploading image", error });
            }
        });
    }
    removeImage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.query.userId;
                if (!userId) {
                    res.status(400).json({ message: "User ID is required" });
                    return;
                }
                const updatedUser = yield profileService.removeImage(userId);
                res.status(200).json({
                    message: 'Image removed successfully',
                    user: updatedUser,
                });
            }
            catch (error) {
            }
        });
    }
    changeName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, username } = req.body;
                if (!userId) {
                    res.status(400).json({ message: "User ID is required" });
                    return;
                }
                if (!username) {
                    res.status(400).json({ message: "Username is required" });
                    return;
                }
                const updatedUser = yield profileService.changeName(userId, username);
                if (updatedUser) {
                    res.status(200).json({
                        message: 'Name changed successfully',
                        user: updatedUser,
                    });
                }
                else {
                    res.status(404).json({ message: 'User not found or name update failed' });
                }
            }
            catch (error) {
                console.error('Error changing name:', error);
                res.status(500).json({ message: 'An error occurred while changing name' });
            }
        });
    }
    addNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, phone } = req.body;
                if (!userId) {
                    res.status(400).json({ message: "User ID is required" });
                    return;
                }
                if (!phone) {
                    res.status(400).json({ message: "Phone Number is required" });
                    return;
                }
                const updatedUser = yield profileService.addPhone(userId, phone);
                if (updatedUser) {
                    res.status(200).json({
                        message: 'Phone number updated successfully',
                        user: updatedUser,
                    });
                }
                else {
                    res.status(404).json({ message: 'User not found or phone update failed' });
                }
            }
            catch (error) {
                console.error('Error updating phone:', error);
                res.status(500).json({ message: 'An error occurred while updating phone' });
            }
        });
    }
    addAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const formData = req.body;
                if (!formData) {
                    res.status(400).json({ message: "Address is required" });
                    return;
                }
                const updatedUser = yield profileService.addAddress(formData);
                if (updatedUser) {
                    res.status(200).json({
                        message: 'Address Added successfully',
                        user: updatedUser,
                    });
                }
                else {
                    res.status(404).json({ message: 'User not found or address adding failed' });
                }
            }
            catch (error) {
            }
        });
    }
    deleteAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, index } = req.body;
            }
            catch (error) {
            }
        });
    }
}
exports.default = ProfileController;
