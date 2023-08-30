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
const express_1 = __importDefault(require("express"));
const auth_1 = require("../Middlewares/auth");
const index_1 = require("../DB/index");
const router = express_1.default.Router();
router.post('/users/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existingUser = yield index_1.user.findOne({ username });
    if (existingUser) {
        res.status(403).json({ message: 'User already exists' });
    }
    else {
        const User = new index_1.user({ username, password });
        yield User.save();
        if (User && User.username && User.password) {
            const token = (0, auth_1.generateJwt)({
                username: User.username,
                password: User.password
            });
            res.json({ message: 'User created successfully', token });
        }
    }
}));
router.post('/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const User = yield index_1.user.findOne({ username, password });
    if (User && User.username && User.password) {
        const token = (0, auth_1.generateJwt)({
            username: User.username,
            password: User.password
        });
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'User authentication failed' });
    }
}));
router.get('/users/courses', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield index_1.course.find({});
    res.json({ courses });
}));
router.post('/users/courses/:courseId', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Course = yield index_1.course.findById(req.params.courseId);
    if (index_1.course) {
        const User = yield index_1.user.findOne({ username: req.headers.username });
        if (User) {
            User.purchasedCourses.push(Course);
            yield User.save();
            res.json({ message: 'Course purchased successfully' });
        }
        else {
            res.status(403).json({ message: 'User not found' });
        }
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
router.get('/users/purchasedCourses', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield index_1.user.findOne({ username: req.headers.username }).populate("purchasedCourses");
    if (User) {
        res.json({ purchasedCourses: User.purchasedCourses || [] });
    }
    else {
        res.status(404).json({ message: "user not found" });
    }
}));
exports.default = router;
