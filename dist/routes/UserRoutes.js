"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("@controllers/UserController");
const router = express_1.default.Router();
router.post('/users', UserController_1.createUser);
router.get('/users', UserController_1.getUsers);
exports.default = router;
