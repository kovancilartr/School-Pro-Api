import { db } from "../../db/prisma";

export async function deleteAttachment(req: any, res: any) {
  try {
    const { attachmentId } = req.params;

    if (!attachmentId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const attachment = await db.attachment.findUnique({
      where: {
        id: attachmentId,
      },
    });

    if (!attachment) {
      return res.status(404).json({ message: "Attachment not found" });
    }

    await db.attachment.delete({
      where: {
        id: attachmentId,
      },
    });

    return res.status(200).json({ message: "Attachment deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
