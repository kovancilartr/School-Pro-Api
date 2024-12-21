import {
  createCustomer,
  getCustomerById,
  getCustomers,
} from "@/controllers/customers";
import express from "express";
const customerRouter = express.Router();

// TEST
customerRouter.post("/customers", createCustomer);
customerRouter.get("/customers", getCustomers);
customerRouter.get("/customers/:id", getCustomerById);

export default customerRouter;
