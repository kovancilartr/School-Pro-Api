import { db } from "../../db/prisma";

export async function deleteSection(req: any, res: any) {
  try {
    const { sectionId } = req.params;

    if (!sectionId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const section = await db.section.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    await db.section.delete({
      where: {
        id: sectionId,
      },
    });

    return res.status(200).json({ message: "Section deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
