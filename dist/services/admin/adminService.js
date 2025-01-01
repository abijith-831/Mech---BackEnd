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
exports.AdminService = void 0;
const AdminUserRepositories_1 = require("../../repositories/implementation/AdminUserRepositories");
const AdminMechRepositories_1 = require("../../repositories/implementation/AdminMechRepositories");
const adminUserRepository = new AdminUserRepositories_1.AdminUserRepositories();
const adminMechRepository = new AdminMechRepositories_1.AdminMechRepositories();
class AdminService {
    constructor() {
        this.getallUsers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield adminUserRepository.findAll();
                if (users.length === 0) {
                    return { message: "No users found" };
                }
                return users;
            }
            catch (error) {
                console.error("Error fetching users:", error);
                return { message: "An error occurred while fetching users" };
            }
        });
        this.getallMechanics = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const mechanics = yield adminMechRepository.findAll();
                if (mechanics.length === 0) {
                    return { message: "No mechanics found" };
                }
                return mechanics;
            }
            catch (error) {
                console.error("Error fetching mechanics:", error);
                return { message: "An error occurred while fetching mechanics" };
            }
        });
        this.verifyMechanic = (mechId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const mechanic = yield adminMechRepository.findMechById(mechId);
                if (!mechanic) {
                    throw new Error('Mechanic not found');
                }
                mechanic.isVerified = true;
                yield mechanic.save();
                return { success: true, message: 'Mechanic verified successfully', mechanic };
            }
            catch (error) {
                console.error('Error verifying mechanic:', error);
                return { success: false, message: 'Failed to verify mechanic' };
            }
        });
    }
}
exports.AdminService = AdminService;
