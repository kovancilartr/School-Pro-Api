import { db } from "../../db/prisma";

export async function createCategory(req: any, res: any) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const createdCategory = await db.category.create({
      data: {
        name,
      },
    });

    return res.status(201).json(createdCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
