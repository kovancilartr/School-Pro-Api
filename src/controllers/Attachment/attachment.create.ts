import { db } from "../../db/prisma";

export async function createAttachment(req: any, res: any) {
  try {
    const { url } = req.body;
    const { courseId } = req.params;
    const name = url.split("/").pop();

    if (!courseId || !url) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const createdAttachment = await db.attachment.create({
      data: {
        name,
        url,
        courseId,
      },
    });

    return res.status(201).json(createdAttachment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
