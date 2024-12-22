import { db } from "../../db/prisma";

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
