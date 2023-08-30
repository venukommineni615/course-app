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
const index_1 = require("../DB/index");
const auth_1 = require("../Middlewares/auth");
const router = express_1.default.Router();
router.get('/get/me', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let admins = yield index_1.admin.findOne({ username: req.headers.username });
    res.json({ admins });
}));
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const existingAdmin = yield index_1.admin.findOne({ username });
    if (existingAdmin) {
        res.status(403).json({ message: 'Admin already exists' });
    }
    else {
        let newAdmin = new index_1.admin({ username, password });
        yield newAdmin.save();
        if (newAdmin && newAdmin.username && newAdmin.password) {
            const token = (0, auth_1.generateJwt)({
                username: newAdmin.username,
                password: newAdmin.password
            });
            res.json({ message: 'Admin created successfully', token });
        }
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const Admin = yield index_1.admin.findOne({ username, password });
    if (Admin) {
        const token = (0, auth_1.generateJwt)(Admin);
        res.json({ message: 'Logged in successfully', token });
    }
    else {
        res.status(403).json({ message: 'Admin authentication failed' });
    }
}));
router.post('/course', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newCourse = new index_1.course(req.body);
    yield newCourse.save();
    res.json({ message: 'Course created successfully', courseId: newCourse.id });
}));
router.put('/courses/:courseId', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Course = yield index_1.course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (Course) {
        res.json({ message: 'Course updated successfully' });
    }
    else {
        res.status(404).json({ message: 'Course not found' });
    }
}));
router.get('/courses', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let courses = yield index_1.course.find({});
    res.json({ courses });
}));
router.get('/course/:courseId', auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Course = yield index_1.course.findById(req.params.courseId);
    if (Course) {
        res.json(Course);
    }
    else {
        res.json({ msg: 'The course is not existed' });
    }
}));
exports.default = router;
