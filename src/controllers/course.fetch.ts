import { Category, Course, Purchase } from "@prisma/client";
import { db } from "../db/prisma";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  progress: number | null;
  purchases: Purchase[] | null;
  sections: {
    chapters: { id: string }[];
  }[];
};

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

export async function getCourses(req: any, res: any) {
  try {
    const { userId, title, categoryId, sectionId } = req.query;

    const publishedChapters = await db.chapter.findMany({
      where: {
        sectionId: sectionId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });
    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);
    const validCompletedChapters = await db.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });
    const progressPercentage =
      (validCompletedChapters / publishedChapterIds.length) * 100;

    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        sections: {
          include: {
            chapters: {
              where: {
                isPublished: true,
              },
              select: {
                id: true,
                position: true,
                useProgress: true,
              },
            },
          },
        },
        purchases: {
          where: {
            userId: userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchases.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return res.status(200).json(coursesWithProgress);
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
