import { db } from "../../db/prisma";

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
