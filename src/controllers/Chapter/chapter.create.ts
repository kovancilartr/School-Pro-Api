import { db } from "../../db/prisma";

export async function createChapter(req: any, res: any) {
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
