"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.course = exports.admin = exports.user = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ADMINS = new mongoose_1.default.Schema({
    username: String,
    password: String
});
const USERS = new mongoose_1.default.Schema({
    username: String,
    password: String,
    purchasedCourses: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "course" }]
});
const COURSES = new mongoose_1.default.Schema({
    title: String,
    image: String,
    description: String,
    price: String
});
exports.user = mongoose_1.default.model("user", USERS);
exports.admin = mongoose_1.default.model("admin", ADMINS);
exports.course = mongoose_1.default.model("course", COURSES);
