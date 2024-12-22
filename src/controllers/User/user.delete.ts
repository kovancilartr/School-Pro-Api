import { db } from "../../db/prisma";
import { clerkClient } from "@clerk/clerk-sdk-node";

export async function deleteUser(req: any, res: any) {
  try {
    const { id } = req.params;

    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    } else {
      await db.user.delete({
        where: {
          id,
        },
      });
      await clerkClient.users.deleteUser(id);
    }

    return res.status(200).json({ message: "Kullanıcı başarı ile silindi" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
