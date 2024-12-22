import { db } from "../../db/prisma";

export async function deleteCourse(req: any, res: any) {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await db.course.delete({
      where: {
        id: courseId,
      },
    });

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
