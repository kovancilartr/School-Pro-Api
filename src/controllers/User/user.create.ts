import { db } from "../../db/prisma";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { Role } from "@prisma/client";

export async function createUser(req: any, res: any) {
  try {
    const { username, email, password, firstName, lastName, role } = req.body;

    if (!email || !username || !password || !firstName || !lastName || !role) {
      return res.status(400).json({ message: "Gerekli alanlar eksik" });
    }
    const createdClerkUser = await clerkClient.users.createUser({
      emailAddress: [email],
      username,
      password,
      publicMetadata: { role },
    });

    const newUserData = {
      id: createdClerkUser.id,
      username,
      email,
      role,
    };
    const createdUser = await db.user.create({
      data: newUserData,
    });
    if (newUserData.role === Role.STUDENT) {
      const createdStudent = await db.student.create({
        data: {
          userId: newUserData.id,
        },
      });
    } else if (newUserData.role === Role.TEACHER) {
      const createdTeacher = await db.teacher.create({
        data: {
          userId: newUserData.id,
        },
      });
    } else if (newUserData.role === Role.ADMIN) {
      const createdAdmin = await db.admin.create({
        data: {
          userId: newUserData.id,
        },
      });
    } else {
      return res.status(400).json({ message: "Kullanıcı türü tanımlanamadı" });
    }

    return res.status(201).json(`User and ${newUserData.role} created`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
