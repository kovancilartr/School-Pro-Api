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



export async function getCourse(req: any, res: any) {
  try {
    const { userId, courseId } = req.query;

    const course = await db.course.findUnique({
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

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
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



// selam






