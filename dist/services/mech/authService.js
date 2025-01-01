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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const MechRepositories_1 = require("../../repositories/implementation/MechRepositories");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mechModel_1 = __importDefault(require("../../models/mech/mechModel"));
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.hash(password, 10);
    });
}
class AuthService {
    constructor() {
        this.mechRepositories = new MechRepositories_1.MechRepositories();
    }
    mechRegister(formData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, username } = formData, workshopDetails = __rest(formData, ["email", "password", "username"]);
            try {
                const existing = yield this.mechRepositories.findMechanicByEmail(email);
                if (existing) {
                    console.log('existing');
                    return { success: false, message: "Mechanic already exists." };
                }
                const hashedPassword = yield hashPassword(password);
                const newMech = new mechModel_1.default(Object.assign(Object.assign({}, workshopDetails), { username,
                    email, password: hashedPassword, isVerified: false }));
                const savedMech = yield this.mechRepositories.createMechanic(newMech);
                if (!savedMech) {
                    return { success: false, message: 'Mechanic Registration failed . please try again later' };
                }
                return { success: true, message: "Registration successfull", mech: savedMech };
            }
            catch (error) {
                console.error("Error during mechanic registration:", error);
                return { success: false, message: "An error occurred during registration." };
            }
        });
    }
    mechLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existing = yield this.mechRepositories.findMechanicByEmail(email);
                if (!existing) {
                    return { success: false, message: 'Invalid Email or Password' };
                }
                if (!existing.isVerified) {
                    return { success: false, message: 'Registration not Approved yet . Please Contact admin' };
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(password, existing.password);
                if (!isPasswordValid) {
                    return { success: false, message: 'Invalid Email or Password' };
                }
                console.log('login sucess');
                return { success: true, message: 'Login Successful' };
            }
            catch (error) {
                console.error("Error during mechanic login:", error);
                return { success: false, message: 'An error occurred during login.' };
            }
        });
    }
}
exports.AuthService = AuthService;
