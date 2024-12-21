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
exports.createCourse = createCourse;
exports.createCourseSection = createCourseSection;
exports.createSectionChapter = createSectionChapter;
exports.createCategory = createCategory;
exports.createPurchase = createPurchase;
exports.createAttachment = createAttachment;
const prisma_1 = require("../db/prisma");
function createCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, imageUrl, videoUrl, teacherId, price } = req.body;
            const { categoryId } = req.params;
            if (!title ||
                !description ||
                !imageUrl ||
                !videoUrl ||
                !teacherId ||
                !price) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const createdCourse = yield prisma_1.db.course.create({
                data: {
                    teacherId,
                    categoryId,
                    title,
                    description,
                    imageUrl,
                    videoUrl,
                    price,
                    isPublished: false,
                },
            });
            return res.status(201).json(createdCourse);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function createCourseSection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, position } = req.body;
            const { courseId } = req.params;
            if (!courseId || !title || !position) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const createdCourseSection = yield prisma_1.db.section.create({
                data: {
                    title,
                    position,
                    courseId,
                },
            });
            return res.status(201).json(createdCourseSection);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function createSectionChapter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, description, videoUrl, position, isPublished, isFree } = req.body;
            const { sectionId } = req.params;
            if (!title ||
                !description ||
                !videoUrl ||
                !position ||
                !isPublished ||
                !isFree) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const createdChapter = yield prisma_1.db.chapter.create({
                data: {
                    title,
                    description,
                    videoUrl,
                    position,
                    isPublished,
                    isFree,
                    sectionId,
                },
            });
            return res.status(201).json(createdChapter);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function createCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name } = req.body;
            if (!name) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const createdCategory = yield prisma_1.db.category.create({
                data: {
                    name,
                },
            });
            return res.status(201).json(createdCategory);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function createPurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { courseId, userId } = req.params;
            if (!courseId || !userId) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const createdPurchase = yield prisma_1.db.purchase.create({
                data: {
                    courseId,
                    userId,
                },
            });
            return res.status(201).json(createdPurchase);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function createAttachment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { url } = req.body;
            const { courseId } = req.params;
            const name = url.split("/").pop();
            if (!courseId || !url) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const createdAttachment = yield prisma_1.db.attachment.create({
                data: {
                    name,
                    url,
                    courseId,
                },
            });
            return res.status(201).json(createdAttachment);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
