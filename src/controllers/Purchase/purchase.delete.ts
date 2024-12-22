import { db } from "../../db/prisma";

export async function deletePurchase(req: any, res: any) {
  try {
    const { purchaseId } = req.params;

    if (!purchaseId) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }

    const purchase = await db.purchase.findUnique({
      where: {
        id: purchaseId,
      },
    });

    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    await db.purchase.delete({
      where: {
        id: purchaseId,
      },
    });

    return res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
