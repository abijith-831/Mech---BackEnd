"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../../controllers/adminController/adminController"));
const admin_routes = express_1.default.Router();
const adminController = new adminController_1.default();
admin_routes.get('/getUsers', adminController.getUserList);
admin_routes.get('/getMechs', adminController.getMechanicList);
admin_routes.patch('/verifyMech', adminController.verifyMechanic);
exports.default = admin_routes;
