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
const adminService_1 = require("../../services/admin/adminService");
const HttpStatus_1 = require("../../enums/HttpStatus");
const adminService = new adminService_1.AdminService();
class AdminController {
    constructor() {
        this.getUserList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield adminService.getallUsers();
                res.status(HttpStatus_1.HttpStatus.CREATED).json(users);
            }
            catch (error) {
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(error);
            }
        });
        this.getMechanicList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const mechanics = yield adminService.getallMechanics();
                res.status(HttpStatus_1.HttpStatus.CREATED).json(mechanics);
            }
            catch (error) {
                res.status(HttpStatus_1.HttpStatus.BAD_REQUEST).json(error);
            }
        });
        this.verifyMechanic = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { mechId } = req.body;
                if (!mechId) {
                    res.status(400).json({
                        success: false,
                        message: 'Mechanic ID is required',
                    });
                }
                const response = yield adminService.verifyMechanic(mechId);
                res.status(200).json({
                    success: true,
                    message: 'Mechanic verified successfully',
                    data: response,
                });
            }
            catch (error) {
                console.error('Error verifying mechanic:', error);
                res.status(500).json({
                    success: false,
                    message: 'An error occurred while verifying the mechanic',
                    error: error.message || 'Internal Server Error',
                });
            }
        });
    }
}
exports.default = AdminController;
