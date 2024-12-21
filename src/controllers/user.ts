import { db } from "@/db/prisma";
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

export async function getAllUsers(req: any, res: any) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllStudents(req: any, res: any) {
  try {
    const students = await db.student.findMany({
      include: {
        user: true,
        courses: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(students);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTeachers(req: any, res: any) {
  try {
    const teachers = await db.teacher.findMany({
      include: {
        user: true,
        courses: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(teachers);
  } catch (error) {
    console.log(error);
  }
}

export async function getAllAdmins(req: any, res: any) {
  try {
    const admins = await db.admin.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(admins);
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(req: any, res: any) {
  const { id } = req.params;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}
