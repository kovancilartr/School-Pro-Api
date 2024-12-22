import { Category, Course, Purchase } from "@prisma/client";
import { db } from "../../db/prisma";

export async function getAllCourses(req: any, res: any) {
  const isPublishedString = req.query.isPublished;
  const isPublished = isPublishedString === "true";

  try {
    const response = await db.course.findMany({
      where:
        isPublishedString === undefined
          ? {}
          : {
              isPublished,
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

    if (!response) {
      return res.status(404).json({ message: "Courses not found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCourse(req: any, res: any) {
  const { userId, courseId } = req.query;
  try {
    const response = await db.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        sections: {
          include: {
            chapters: {
              where: {
                isPublished: true,
              },
              include: {
                useProgress: {
                  where: {
                    userId,
                  },
                },
              },
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        purchases: {
          where: {
            userId: req.userId,
          },
        },
      },
    });

    if (!response) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getUserCoursesWithProgress(req: any, res: any) {
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

    type CourseWithProgressWithCategory = Course & {
      category: Category | null;
      progress: number | null;
      purchases: Purchase[] | null;
      sections: {
        chapters: { id: string }[];
      }[];
    };

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
