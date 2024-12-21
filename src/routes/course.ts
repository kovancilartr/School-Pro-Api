import {
  createAttachment,
  createCategory,
  createCourse,
  createCourseSection,
  createPurchase,
  createSectionChapter,
} from "@/controllers/course.create";
import {
  deleteAttachment,
  deleteCategory,
  deleteChapter,
  deleteCourse,
  deletePurchase,
  deleteSection,
} from "@/controllers/course.delete";
import {
  getAllCourses,
  getAllSections,
  getAllCategories,
  getAllChapters,
  getAllAttachments,
  getAllPurchases,
} from "@/controllers/course.fetch";
import express from "express";

const courseRouter = express.Router();

// POST
courseRouter.post("/course/create/:categoryId", createCourse);
courseRouter.post("/course/category/create", createCategory);
courseRouter.post("/course/section/create/:courseId", createCourseSection);
courseRouter.post("/course/chapter/create/:sectionId", createSectionChapter);
courseRouter.post("/course/purchase/create/:courseId&:userId", createPurchase);
courseRouter.post("/course/attachment/create/:courseId", createAttachment);

// GET
courseRouter.get("/course/all", getAllCourses);
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
