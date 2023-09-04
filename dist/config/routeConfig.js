"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("@controllers/UserController");
const configureRoutes = (app) => {
    // Define user routes
    app.post('/users', UserController_1.createUser);
    app.get('/users', UserController_1.getUsers);
    // Add more routes here as needed
};
exports.default = configureRoutes;
