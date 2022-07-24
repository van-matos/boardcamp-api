import { Router } from "express";

import { createCustomers, readCustomers, readCustomersById, updateCustomers } from "../controllers/customersController.js";
import { validateCustomer, validateCustomerCpf, validateCustomerId } from "../middlewares/customersMiddleware.js";

const router = Router();

router.get("/customers", readCustomers);
router.get("/customers/:id", validateCustomerId,readCustomersById);
router.post("/customers", validateCustomer, createCustomers);
router.put("/customers/:id", validateCustomerCpf, validateCustomerId, updateCustomers);

export default router;