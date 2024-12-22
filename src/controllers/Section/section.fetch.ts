import { db } from "../../db/prisma";

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
