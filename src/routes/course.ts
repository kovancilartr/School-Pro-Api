import { createAttachment } from "../controllers/Attachment/attachment.create";
import { deleteAttachment } from "../controllers/Attachment/attachment.delete";
import { getAllAttachments } from "../controllers/Attachment/attachment.fetch";
import { createCategory } from "../controllers/Category/category.create";
import { deleteCategory } from "../controllers/Category/category.delete";
import { getAllCategories } from "../controllers/Category/category.fetch";
import { createChapter } from "../controllers/Chapter/chapter.create";
import { deleteChapter } from "../controllers/Chapter/chapter.delete";
import { getAllChapters } from "../controllers/Chapter/chapter.fetch";
import { createCourse } from "../controllers/Course/course.create";
import { deleteCourse } from "../controllers/Course/course.delete";
import { getAllCourses, getCourse, getUserCoursesWithProgress } from "../controllers/Course/course.fetch";
import { createPurchase } from "../controllers/Purchase/purchase.create";
import { deletePurchase } from "../controllers/Purchase/purchase.delete";
import { getAllPurchases } from "../controllers/Purchase/purchase.fetch";
import { createSection } from "../controllers/Section/section.create";
import { deleteSection } from "../controllers/Section/section.delete";
import { getAllSections } from "../controllers/Section/section.fetch";
import express from "express";

const courseRouter = express.Router();



// POST
courseRouter.post("/course/create/:categoryId", createCourse);
courseRouter.post("/course/category/create", createCategory);
courseRouter.post("/course/section/create/:courseId", createSection);
courseRouter.post("/course/chapter/create/:sectionId", createChapter);
courseRouter.post("/course/purchase/create/:courseId&:userId", createPurchase);
courseRouter.post("/course/attachment/create/:courseId", createAttachment);

// FETCH
courseRouter.get("/course/all", getAllCourses);
courseRouter.get("/course/get-course", getCourse);
courseRouter.get("/course/get-user-courses-with-progress", getUserCoursesWithProgress);
courseRouter.get("/course/category/all", getAllCategories);
courseRouter.get("/course/section/all", getAllSections);
courseRouter.get("/course/chapter/all", getAllChapters);
courseRouter.get("/course/purchase/all", getAllPurchases);
courseRouter.get("/course/attachment/all", getAllAttachments);

// DELETE
courseRouter.delete("/course/:courseId", deleteCourse);
courseRouter.delete("/course/section/:sectionId", deleteSection);
courseRouter.delete("/course/chapter/:chapterId", deleteChapter);
courseRouter.delete("/course/category/:categoryId", deleteCategory);
courseRouter.delete("/course/attachment/:attachmentId", deleteAttachment);
courseRouter.delete("/course/purchase/:purchaseId", deletePurchase);

export default courseRouter;
