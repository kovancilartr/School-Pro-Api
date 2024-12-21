"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.post("/user/create", user_1.createUser);
userRouter.get("/user/all", user_1.getAllUsers);
userRouter.get("/user/all/students", user_1.getAllStudents);
userRouter.get("/user/all/teachers", user_1.getAllTeachers);
userRouter.get("/user/all/admins", user_1.getAllAdmins);
userRouter.delete("/user/:id", user_1.deleteUser);
userRouter.get("/user/:id", user_1.getUserById);
exports.default = userRouter;
