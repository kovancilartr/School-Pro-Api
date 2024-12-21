"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_create_1 = require("../controllers/course.create");
const course_delete_1 = require("../controllers/course.delete");
const course_fetch_1 = require("../controllers/course.fetch");
const express_1 = __importDefault(require("express"));
const courseRouter = express_1.default.Router();
courseRouter.post("/course/create/:categoryId", course_create_1.createCourse);
courseRouter.post("/course/category/create", course_create_1.createCategory);
courseRouter.post("/course/section/create/:courseId", course_create_1.createCourseSection);
courseRouter.post("/course/chapter/create/:sectionId", course_create_1.createSectionChapter);
courseRouter.post("/course/purchase/create/:courseId&:userId", course_create_1.createPurchase);
courseRouter.post("/course/attachment/create/:courseId", course_create_1.createAttachment);
courseRouter.get("/course/all", course_fetch_1.getAllCourses);
courseRouter.get("/course/category/all", course_fetch_1.getAllCategories);
courseRouter.get("/course/section/all", course_fetch_1.getAllSections);
courseRouter.get("/course/chapter/all", course_fetch_1.getAllChapters);
courseRouter.get("/course/purchase/all", course_fetch_1.getAllPurchases);
courseRouter.get("/course/attachment/all", course_fetch_1.getAllAttachments);
courseRouter.delete("/course/:courseId", course_delete_1.deleteCourse);
courseRouter.delete("/course/section/:sectionId", course_delete_1.deleteSection);
courseRouter.delete("/course/chapter/:chapterId", course_delete_1.deleteChapter);
courseRouter.delete("/course/category/:categoryId", course_delete_1.deleteCategory);
courseRouter.delete("/course/attachment/:attachmentId", course_delete_1.deleteAttachment);
courseRouter.delete("/course/purchase/:purchaseId", course_delete_1.deletePurchase);
exports.default = courseRouter;