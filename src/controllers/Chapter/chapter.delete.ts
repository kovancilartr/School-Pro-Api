import { db } from "../../db/prisma";

export async function deleteChapter(req: any, res: any) {
  try {
    const { chapterId } = req.params;

    if (!chapterId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
      },
    });

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    await db.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    return res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
