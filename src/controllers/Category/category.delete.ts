import { db } from "../../db/prisma";

export async function deleteCategory(req: any, res: any) {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const category = await db.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await db.category.delete({
      where: {
        id: categoryId,
      },
    });

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
