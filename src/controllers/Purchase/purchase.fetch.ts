import { db } from "../../db/prisma";

export async function getAllPurchases(req: any, res: any) {
  try {
    const purchases = await db.purchase.findMany({
      include: {
        course: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return res.status(200).json(purchases);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
