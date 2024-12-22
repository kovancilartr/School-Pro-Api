import { db } from "../../db/prisma";

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
