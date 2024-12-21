import { db } from "../db/prisma";

export async function getAllCourses(req: any, res: any) {
  try {
    const courses = await db.course.findMany({
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllCategories(req: any, res: any) {
  try {
    const categories = await db.category.findMany({
      include: {
        courses: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllSections(req: any, res: any) {
  try {
    const sections = await db.section.findMany({
      include: {
        chapters: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return res.status(200).json(sections);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllChapters(req: any, res: any) {
  try {
    const chapters = await db.chapter.findMany({
      include: {
        muxData: true,
        useProgress: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return res.status(200).json(chapters);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllPurchases(req: any, res: any) {
  try {
    const purchases = await db.purchase.findMany({
      include: {
        course: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return res.status(200).json(purchases);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllAttachments(req: any, res: any) {
  try {
    const attachments = await db.attachment.findMany({
      include: {
        course: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return res.status(200).json(attachments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
