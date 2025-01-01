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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = require("../../services/mech/authService");
const HttpStatus_1 = require("../../enums/HttpStatus");
const authService = new authService_1.AuthService();
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const FormData = __rest(req.body, []);
                const response = yield authService.mechRegister(FormData);
                if (!response.success) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(response);
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ success: true,
                        message: "user Registered successfully",
                        mech: response.mech
                    });
                }
            }
            catch (error) {
                console.error("Error in registration:", error);
                res.status(HttpStatus_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "An error occurred during registration.",
                });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield authService.mechLogin(email, password);
                if (!response.success) {
                    res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(response);
                }
                else {
                    res.status(HttpStatus_1.HttpStatus.CREATED).json({ success: true,
                        message: "user Registered successfully",
                    });
                }
            }
            catch (error) {
            }
        });
    }
}
exports.default = AuthController;
