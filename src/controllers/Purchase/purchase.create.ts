import { db } from "../../db/prisma";

export async function createPurchase(req: any, res: any) {
  try {
    const { courseId, userId } = req.params;

    if (!courseId || !userId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }
    const createdPurchase = await db.purchase.create({
      data: {
        courseId,
        userId,
      },
    });
    return res.status(201).json(createdPurchase);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
