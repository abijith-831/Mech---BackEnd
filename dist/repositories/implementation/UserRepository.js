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
exports.UserRepositories = void 0;
const userModel_1 = __importDefault(require("../../models/user/userModel"));
class UserRepositories {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_1.default.create(data);
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield userModel_1.default.findOne({ email });
            const userdata = data === null || data === void 0 ? void 0 : data.toObject();
            console.log(userdata);
            return userdata;
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_1.default.findById(id);
        });
    }
    verifyUser(email, isVerified) {
        return __awaiter(this, void 0, void 0, function* () {
            yield userModel_1.default.updateOne({ email }, { isVerified });
            return yield userModel_1.default.findOne({ email });
        });
    }
    UpdatePassword(email, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            const update = { $set: { [field]: value } };
            return yield userModel_1.default.findOneAndUpdate({ email }, update, { new: true });
        });
    }
    updateProfile(userId, updateProfileDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userModel_1.default.findByIdAndUpdate(userId, { $set: updateProfileDto }, { new: true });
        });
    }
}
exports.UserRepositories = UserRepositories;
