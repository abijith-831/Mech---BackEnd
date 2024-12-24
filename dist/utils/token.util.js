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
exports.generateRefreshToken = exports.generateAcessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAcessToken = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_ACCESSTOKEN;
    if (!secret) {
        throw new Error("access token not working");
    }
    const payload = Object.assign({}, user);
    const res = yield jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "24h" });
    return res;
});
exports.generateAcessToken = generateAcessToken;
const generateRefreshToken = (user) => {
    const secret = process.env.JWT_REFRESHTOKEN;
    if (!secret) {
        throw new Error("refresh token not working");
    }
    const payload = Object.assign({}, user);
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "7d" });
};
exports.generateRefreshToken = generateRefreshToken;
