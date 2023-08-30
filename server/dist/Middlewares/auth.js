"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = exports.generateJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const generateJwt = (user) => {
    const payload = { username: user.username };
    return jsonwebtoken_1.default.sign(payload, process.env.secretkey, { expiresIn: '1h' });
};
exports.generateJwt = generateJwt;
const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.secretkey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            if (!user) {
                return res.sendStatus(403);
            }
            if (typeof user === "object") {
                req.headers["username"] = user.username;
                next();
            }
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJwt = authenticateJwt;
