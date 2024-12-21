import { db } from "../db/prisma";

export async function createCourse(req: any, res: any) {
  try {
    const { title, description, imageUrl, videoUrl, teacherId, price } =
      req.body;
    const { categoryId } = req.params;

    if (
      !title ||
      !description ||
      !imageUrl ||
      !videoUrl ||
      !teacherId ||
      !price
    ) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const createdCourse = await db.course.create({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createCourseSection(req: any, res: any) {
  try {
    const { title, position } = req.body;
    const { courseId } = req.params;

    if (!courseId || !title || !position) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const createdCourseSection = await db.section.create({
      data: {
        title,
        position,
        courseId,
      },
    });

    return res.status(201).json(createdCourseSection);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createSectionChapter(req: any, res: any) {
  try {
    const { title, description, videoUrl, position, isPublished, isFree } =
      req.body;
    const { sectionId } = req.params;

    if (
      !title ||
      !description ||
      !videoUrl ||
      !position ||
      !isPublished ||
      !isFree
    ) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const createdChapter = await db.chapter.create({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createCategory(req: any, res: any) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const createdCategory = await db.category.create({
      data: {
        name,
      },
    });

    return res.status(201).json(createdCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createPurchase(req: any, res: any) {
  try {
    const { courseId, userId } = req.params;

    if (!courseId || !userId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }
    const createdPurchase = await db.purchase.create({
      data: {
        courseId,
        userId,
      },
    });
    return res.status(201).json(createdPurchase);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createAttachment(req: any, res: any) {
  try {
    const { url } = req.body;
    const { courseId } = req.params;
    const name = url.split("/").pop();

    if (!courseId || !url) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const createdAttachment = await db.attachment.create({
      data: {
        name,
        url,
        courseId,
      },
    });

    return res.status(201).json(createdAttachment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
