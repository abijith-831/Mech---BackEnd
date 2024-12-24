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
exports.AuthService = exports.generateOtp = void 0;
const UserRepository_1 = require("../../repositories/implementation/UserRepository");
const OtpRepositories_1 = require("../../repositories/implementation/OtpRepositories");
const email_utils_1 = require("../../utils/email.utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_util_1 = require("../../utils/token.util");
const mailService = new email_utils_1.MailService();
const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp, "this is the otp generator");
    return otp;
};
exports.generateOtp = generateOtp;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.hash(password, 10);
    });
}
class AuthService {
    constructor() {
        this.userRepositories = new UserRepository_1.UserRepositories();
        this.otpRepositories = new OtpRepositories_1.OtpRepository();
    }
    userSignup(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUser = yield this.userRepositories.findUserByEmail(email);
            if (existingUser && existingUser.isVerified) {
                return { success: false, message: "user already existed" };
            }
            if (existingUser && !existingUser.isVerified) {
                const getOtp = yield this.otpRepositories.findOtpByEmail(email);
                if (getOtp) {
                    const currentTime = new Date().getTime();
                    const expirationTime = new Date(getOtp.createdAt).getTime() + 5 * 60 * 1000;
                    if (currentTime < expirationTime) {
                        return { success: false, message: "OTP is still valid. Please verify using the same OTP." };
                    }
                    else {
                        const newOtp = (0, exports.generateOtp)();
                        yield this.otpRepositories.updateOtpByEmail(email, newOtp);
                        yield mailService.sendOtpEmail(email, newOtp);
                        return { success: false, message: "OTP expired. A new OTP has been sent to your email." };
                    }
                }
                else {
                    const newOtp = (0, exports.generateOtp)();
                    yield this.otpRepositories.create({ email, otp: newOtp, });
                    yield mailService.sendOtpEmail(email, newOtp);
                    return { success: false, message: "No OTP found. A new OTP has been sent to your email." };
                }
            }
            const hashedPassword = yield hashPassword(password);
            const savedDetails = yield this.userRepositories.createUser({
                username: username,
                email: email,
                password: hashedPassword,
            });
            if (!savedDetails) {
                return {
                    success: false,
                    message: "User registration failed. Please try again later.",
                };
            }
            const newOtp = (0, exports.generateOtp)();
            console.log(newOtp);
            yield this.otpRepositories.createOtp({ email, otp: newOtp, });
            yield mailService.sendOtpEmail(email, newOtp);
            return {
                success: true,
                message: "User created successfully",
                user: {
                    id: savedDetails.id,
                    username: savedDetails.username,
                    email: savedDetails.email,
                },
            };
        });
    }
    verifyUserOtp(otpdata) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, otpData } = otpdata;
            console.log('emm', email);
            console.log('emm', otpData);
            const validUser = yield this.userRepositories.findUserByEmail(email);
            if (!validUser) {
                return { success: false, message: "this email is not registered" };
            }
            const currentOtp = yield this.otpRepositories.findOtpByEmail(email);
            if (!(currentOtp === null || currentOtp === void 0 ? void 0 : currentOtp.otp))
                return { success: false, message: "resend the otp" };
            if (currentOtp.otp == otpData) {
                yield this.userRepositories.verifyUser(email, true);
                yield this.otpRepositories.deleteOtpByEmail(email);
                return { success: true, message: "User Signed Up Successfully ...!" };
            }
            else {
                return { success: false, message: "please enter valid otp" };
            }
        });
    }
    resendOtp(resendOtpdata) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = resendOtpdata.email;
            const otp = (0, exports.generateOtp)();
            try {
                const existingEmail = yield this.otpRepositories.findOtpByEmail(email);
                if (existingEmail) {
                    yield this.otpRepositories.updateOtpByEmail(email, otp);
                }
                else {
                    yield this.otpRepositories.create({ email, otp });
                }
                yield mailService.sendOtpEmail(email, otp);
                return { success: true, message: 'new Otp is sended' };
            }
            catch (error) {
                return { success: false, message: 'failed to resend otp' };
            }
        });
    }
    userLogin(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userData;
            const existingUser = yield this.userRepositories.findUserByEmail(email);
            if (!existingUser) {
                return { success: false, message: 'invalid email or Password' };
            }
            const validPassword = yield bcryptjs_1.default.compare(password, existingUser.password);
            if (!validPassword) {
                return { success: false, message: 'Invalid Email or Password' };
            }
            if (existingUser && existingUser.isBlocked) {
                return { success: false, message: 'the user is blocked' };
            }
            const userdata = {
                username: existingUser.username,
                email: existingUser.email
            };
            const data = __rest(existingUser, []);
            const accessToken = yield (0, token_util_1.generateAcessToken)(data);
            const refreshToken = yield (0, token_util_1.generateRefreshToken)(existingUser);
            return { success: true, message: 'Login Successful...!', data: userdata, accessToken, refreshToken };
        });
    }
    forgetPass(forgetPass) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = forgetPass.email;
            try {
                const existing = yield this.userRepositories.findUserByEmail(email);
                if (!existing) {
                    return { success: false, message: 'Please enter a valid email' };
                }
                const otp = (0, exports.generateOtp)();
                yield this.otpRepositories.create({ email, otp });
                yield mailService.sendOtpEmail(email, otp);
                return { success: true, message: 'Otp sended to registered mail' };
            }
            catch (error) {
                return { success: false, message: 'failed to send otp ' };
            }
        });
    }
    resetPass(resetPass) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newPass, email } = resetPass;
            try {
                const existingUser = yield this.userRepositories.findUserByEmail(email);
                if (!existingUser) {
                    return { success: false, message: "User not found" };
                }
                const isSamePassword = yield bcryptjs_1.default.compare(newPass, existingUser.password);
                if (isSamePassword) {
                    return { success: false, message: "New password cannot be the same as the old password" };
                }
                const hashedPassword = yield bcryptjs_1.default.hash(newPass, 10);
                const changedPass = yield this.userRepositories.UpdatePassword(email, 'password', hashedPassword);
                if (!changedPass) {
                    return { success: false, message: "Failed to update the password" };
                }
                return { success: true, message: "Password successfully changed" };
            }
            catch (error) {
                console.error('Reset password error:', error);
                return { success: false, message: 'Something went wrong' };
            }
        });
    }
}
exports.AuthService = AuthService;
