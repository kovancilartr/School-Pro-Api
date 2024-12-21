"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomer = createCustomer;
exports.getCustomers = getCustomers;
exports.getCustomerById = getCustomerById;
const prisma_1 = require("../db/prisma");
function createCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, phone } = req.body;
        try {
            const newCustomer = yield prisma_1.db.customer.create({
                data: {
                    name,
                    email,
                    phone,
                },
            });
            return res.status(201).json(newCustomer);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });
}
function getCustomers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customers = yield prisma_1.db.customer.findMany({
                orderBy: {
                    createdAt: "desc",
                },
            });
            return res.status(200).json(customers);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function getCustomerById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const customer = yield prisma_1.db.customer.findUnique({
                where: {
                    id,
                },
            });
            return res.status(200).json(customer);
        }
        catch (error) {
            console.log(error);
        }
    });
}
