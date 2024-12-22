import { db } from "../../db/prisma";

export async function getAllAttachments(req: any, res: any) {
  try {
    const attachments = await db.attachment.findMany({
      include: {
        course: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return res.status(200).json(attachments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
