import { db } from "../../db/prisma";

export async function getAllCategories(req: any, res: any) {
  try {
    const categories = await db.category.findMany({
      include: {
        courses: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
