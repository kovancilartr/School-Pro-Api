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
exports.deleteCourse = deleteCourse;
exports.deleteSection = deleteSection;
exports.deleteChapter = deleteChapter;
exports.deleteCategory = deleteCategory;
exports.deleteAttachment = deleteAttachment;
exports.deletePurchase = deletePurchase;
const prisma_1 = require("../db/prisma");
function deleteCourse(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { courseId } = req.params;
            if (!courseId) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const course = yield prisma_1.db.course.findUnique({
                where: {
                    id: courseId,
                },
            });
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
            yield prisma_1.db.course.delete({
                where: {
                    id: courseId,
                },
            });
            return res.status(200).json({ message: "Course deleted successfully" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function deleteSection(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { sectionId } = req.params;
            if (!sectionId) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const section = yield prisma_1.db.section.findUnique({
                where: {
                    id: sectionId,
                },
            });
            if (!section) {
                return res.status(404).json({ message: "Section not found" });
            }
            yield prisma_1.db.section.delete({
                where: {
                    id: sectionId,
                },
            });
            return res.status(200).json({ message: "Section deleted successfully" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function deleteChapter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { chapterId } = req.params;
            if (!chapterId) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const chapter = yield prisma_1.db.chapter.findUnique({
                where: {
                    id: chapterId,
                },
            });
            if (!chapter) {
                return res.status(404).json({ message: "Chapter not found" });
            }
            yield prisma_1.db.chapter.delete({
                where: {
                    id: chapterId,
                },
            });
            return res.status(200).json({ message: "Chapter deleted successfully" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function deleteCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { categoryId } = req.params;
            if (!categoryId) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const category = yield prisma_1.db.category.findUnique({
                where: {
                    id: categoryId,
                },
            });
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            yield prisma_1.db.category.delete({
                where: {
                    id: categoryId,
                },
            });
            return res.status(200).json({ message: "Category deleted successfully" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function deleteAttachment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { attachmentId } = req.params;
            if (!attachmentId) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const attachment = yield prisma_1.db.attachment.findUnique({
                where: {
                    id: attachmentId,
                },
            });
            if (!attachment) {
                return res.status(404).json({ message: "Attachment not found" });
            }
            yield prisma_1.db.attachment.delete({
                where: {
                    id: attachmentId,
                },
            });
            return res.status(200).json({ message: "Attachment deleted successfully" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function deletePurchase(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { purchaseId } = req.params;
            if (!purchaseId) {
                return res.status(400).json({ message: "Gerekli alanlar eksik" });
            }
            const purchase = yield prisma_1.db.purchase.findUnique({
                where: {
                    id: purchaseId,
                },
            });
            if (!purchase) {
                return res.status(404).json({ message: "Purchase not found" });
            }
            yield prisma_1.db.purchase.delete({
                where: {
                    id: purchaseId,
                },
            });
            return res.status(200).json({ message: "Purchase deleted successfully" });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
