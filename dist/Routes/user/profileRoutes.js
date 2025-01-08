"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profileController_1 = __importDefault(require("../../controllers/userController/profileController"));
const uploadMiddleware_1 = __importDefault(require("../../middleware/uploadMiddleware"));
const profileController = new profileController_1.default();
const profile_routes = express_1.default.Router();
profile_routes.post("/changeImage", uploadMiddleware_1.default.single("profileImage"), (req, res) => profileController.changeImage(req, res));
profile_routes.delete('/removeImage', profileController.removeImage);
profile_routes.patch('/changeName', profileController.changeName);
profile_routes.post('/addNumber', profileController.addNumber);
profile_routes.post('/addAddress', uploadMiddleware_1.default.none(), profileController.addAddress);
profile_routes.delete('/deleteAddress', uploadMiddleware_1.default.none(), profileController.deleteAddress);
exports.default = profile_routes;
