"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connectDatabase() {
    return new Promise((resolve, reject) => {
        mongoose_1.default.connect('mongodb://localhost:27017/cargodb')
            .then(() => {
            console.log('Connected to MongoDB');
            resolve();
        })
            .catch((error) => {
            console.log('Error connecting to MongoDB');
            reject(error);
        });
    });
}
exports.connectDatabase = connectDatabase;
