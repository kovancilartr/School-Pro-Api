import { createUser } from "../controllers/User/user.create";
import { deleteUser } from "../controllers/User/user.delete";
import {
  getAllAdmins,
  getAllStudents,
  getAllTeachers,
  getAllUsers,
  getUserById,
} from "../controllers/User/user.fetch";
import express from "express";

const userRouter = express.Router();

userRouter.post("/user/create", createUser);
userRouter.get("/user/all", getAllUsers);
userRouter.get("/user/all/students", getAllStudents);
userRouter.get("/user/all/teachers", getAllTeachers);
userRouter.get("/user/all/admins", getAllAdmins);
userRouter.delete("/user/:id", deleteUser);
userRouter.get("/user/:id", getUserById);

export default userRouter;
