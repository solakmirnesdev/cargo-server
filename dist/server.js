"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv = __importStar(require("dotenv"));
const db_1 = require("./database/db");
// Entry routes
const WelcomeRoute_1 = __importDefault(require("./routes/WelcomeRoute"));
const DocumentationRoute_1 = __importDefault(require("./routes/DocumentationRoute"));
// Route config
const routeConfig_1 = __importDefault(require("./config/routeConfig"));
const app = (0, express_1.default)();
app.use(express_1.default.static('public'));
// Middleware
app.use('/', WelcomeRoute_1.default);
app.use('/', DocumentationRoute_1.default);
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Configure routes
(0, routeConfig_1.default)(app);
// Env config
dotenv.config();
// Connect to mongoDB
(0, db_1.connectDatabase)();
const port = parseInt(process.env.PORT || '8000', 10);
const server = app.listen(port, () => {
    console.log(`SUCCESS: Server started on port: ${port}`);
});
process.on('SIGINT', () => {
    console.log('INFO: Shutting down server...');
    server.close(() => {
        console.log('SUCCESS: Server shut down.');
        process.exit(0);
    });
});
