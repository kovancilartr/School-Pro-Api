import { db } from "../../db/prisma";

export async function createSection(req: any, res: any) {
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
