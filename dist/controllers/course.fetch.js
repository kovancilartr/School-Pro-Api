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
exports.getAllCourses = getAllCourses;
exports.getAllCategories = getAllCategories;
exports.getAllSections = getAllSections;
exports.getAllChapters = getAllChapters;
exports.getAllPurchases = getAllPurchases;
exports.getAllAttachments = getAllAttachments;
const prisma_1 = require("../db/prisma");
function getAllCourses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const courses = yield prisma_1.db.course.findMany({
                where: {
                    isPublished: false,
                },
                include: {
                    sections: {
                        include: {
                            chapters: true,
                        },
                    },
                    attachments: true,
                    purchases: true,
                    students: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            return res.status(200).json(courses);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getAllCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield prisma_1.db.category.findMany({
                include: {
                    courses: true,
                },
                orderBy: {
                    name: "asc",
                },
            });
            return res.status(200).json(categories);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getAllSections(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sections = yield prisma_1.db.section.findMany({
                include: {
                    chapters: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            return res.status(200).json(sections);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getAllChapters(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chapters = yield prisma_1.db.chapter.findMany({
                include: {
                    muxData: true,
                    useProgress: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            return res.status(200).json(chapters);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getAllPurchases(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const purchases = yield prisma_1.db.purchase.findMany({
                include: {
                    course: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            return res.status(200).json(purchases);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getAllAttachments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const attachments = yield prisma_1.db.attachment.findMany({
                include: {
                    course: true,
                },
                orderBy: {
                    createdAt: "asc",
                },
            });
            return res.status(200).json(attachments);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
