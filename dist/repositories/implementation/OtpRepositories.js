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
exports.OtpRepository = void 0;
const otpModel_1 = __importDefault(require("../../models/user/otpModel"));
const BaseRepository_1 = require("./BaseRepository");
class OtpRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(otpModel_1.default);
    }
    createOtp(otpData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOtp = new this.model(otpData);
            return yield newOtp.save();
        });
    }
    findOtpByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne({ email });
            }
            catch (error) {
                console.error('Error in finding the OTP by email:', error);
                return null;
            }
        });
    }
    updateOtpByEmail(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            yield otpModel_1.default.updateOne({ email }, { otp, createdAt: new Date() });
        });
    }
    saveOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            const newOtp = new otpModel_1.default({ email, otp });
            yield newOtp.save();
        });
    }
    deleteOtpByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield otpModel_1.default.deleteOne({ email });
        });
    }
    findOneByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return otpModel_1.default.findOne({ email });
        });
    }
}
exports.OtpRepository = OtpRepository;
