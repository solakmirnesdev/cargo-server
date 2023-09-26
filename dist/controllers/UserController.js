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
exports.getUsers = exports.createUser = void 0;
const UserModel_1 = __importDefault(require("../models/UserModel"));
// Auth
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtService_1 = require("../services/auth/jwtService");
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Check if the user already exists
        const existingUser = yield UserModel_1.default.findOne({ email });
        if (existingUser !== null) {
            res.status(409).json({ error: 'User already exists' });
            console.log(existingUser);
            return;
        }
        // Hash user's password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // Create new user document
        const newUser = new UserModel_1.default({
            username,
            email,
            password: hashedPassword
        });
        // Save user to database
        yield newUser.save();
        // Generate a JWT token for the new user
        const token = (0, jwtService_1.generateToken)({ userId: newUser._id, username: newUser.username });
        res.status(201).json({ user: newUser, token });
    }
    catch (error) {
        console.log('ERROR: Creating user', error);
        res.status(500).json({ error });
    }
});
exports.createUser = createUser;
// List all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserModel_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        console.log('ERROR: Fetching users', error);
        res.status(500).json({ error: '500, Internal Server Error' });
    }
});
exports.getUsers = getUsers;
