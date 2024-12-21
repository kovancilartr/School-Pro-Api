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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.deleteUser = deleteUser;
exports.getAllUsers = getAllUsers;
exports.getAllStudents = getAllStudents;
exports.getAllTeachers = getAllTeachers;
exports.getAllAdmins = getAllAdmins;
exports.getUserById = getUserById;
const prisma_1 = require("../db/prisma");
const clerk_sdk_node_1 = require("@clerk/clerk-sdk-node");
const client_1 = require("@prisma/client");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password, firstName, lastName, role } = req.body;
            if (!email || !username || !password || !firstName || !lastName || !role) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const createdClerkUser = yield clerk_sdk_node_1.clerkClient.users.createUser({
                emailAddress: [email],
                username,
                password,
                publicMetadata: { role },
            });
            const newUserData = {
                id: createdClerkUser.id,
                username,
                email,
                role,
            };
            const createdUser = yield prisma_1.db.user.create({
                data: newUserData,
            });
            if (newUserData.role === client_1.Role.STUDENT) {
                const createdStudent = yield prisma_1.db.student.create({
                    data: {
                        userId: newUserData.id,
                    },
                });
            }
            else if (newUserData.role === client_1.Role.TEACHER) {
                const createdTeacher = yield prisma_1.db.teacher.create({
                    data: {
                        userId: newUserData.id,
                    },
                });
            }
            else if (newUserData.role === client_1.Role.ADMIN) {
                const createdAdmin = yield prisma_1.db.admin.create({
                    data: {
                        userId: newUserData.id,
                    },
                });
            }
            else {
                return res.status(400).json({ message: "Kullanıcı türü tanımlanamadı" });
            }
            return res.status(201).json(`User and ${newUserData.role} created`);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield prisma_1.db.user.findUnique({
                where: {
                    id,
                },
            });
            if (!user) {
                return res.status(404).json({ message: "Kullanıcı bulunamadı" });
            }
            else {
                yield prisma_1.db.user.delete({
                    where: {
                        id,
                    },
                });
                yield clerk_sdk_node_1.clerkClient.users.deleteUser(id);
            }
            return res.status(200).json({ message: "Kullanıcı başarı ile silindi" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield prisma_1.db.user.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });
            return res.status(200).json(users);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getAllStudents(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const students = yield prisma_1.db.student.findMany({
                include: {
                    user: true,
                    courses: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return res.status(200).json(students);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getAllTeachers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teachers = yield prisma_1.db.teacher.findMany({
                include: {
                    user: true,
                    courses: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return res.status(200).json(teachers);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getAllAdmins(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const admins = yield prisma_1.db.admin.findMany({
                include: {
                    user: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return res.status(200).json(admins);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getUserById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield prisma_1.db.user.findUnique({
                where: {
                    id,
                },
            });
            return res.status(200).json(user);
        }
        catch (error) {
            console.log(error);
        }
    });
}
