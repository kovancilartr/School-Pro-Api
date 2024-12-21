import { db } from "@/db/prisma";
import { Request, Response } from "express";

export async function createCustomer(req: any, res: any) {
  const { name, email, phone } = req.body;
  try {
    const newCustomer = await db.customer.create({
      data: {
        name,
        email,
        phone,
      },
    });
    return res.status(201).json(newCustomer);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getCustomers(req: any, res: any) {
  try {
    const customers = await db.customer.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(customers);
  } catch (error) {
    console.log(error);
  }
}

export async function getCustomerById(req: any, res: any) {
  const { id } = req.params;
  try {
    const customer = await db.customer.findUnique({
      where: {
        id,
      },
    });
    return res.status(200).json(customer);
  } catch (error) {
    console.log(error);
  }
}
