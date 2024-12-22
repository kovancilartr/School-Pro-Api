import { db } from "../../db/prisma";

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
