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
exports.userStatus = void 0;
const userService_1 = require("../services/user/userService");
const HttpStatus_1 = require("../enums/HttpStatus");
const userService = new userService_1.UserService();
const userStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('k');
        const userId = req.user;
        console.log(userId, 'klpo');
        const id = userId._id;
        console.log(id, 'kkoopppopppp');
        const userData = yield userService.getProfileData(id);
        console.log(userData, 'jj');
        if (userData === null || userData === void 0 ? void 0 : userData.isBlocked) {
            res.clearCookie('refreshtoken');
            res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json({ success: false, message: "No authentication" });
            return;
        }
        else {
            next();
        }
    }
    catch (error) {
        console.log('error in userStaus checking middlewarw', error);
    }
});
exports.userStatus = userStatus;
