import { Router } from "express";

import { createCustomers, readCustomers, readCustomersById } from "../controllers/customersController.js";
import { validateCustomer, validateCustomerId } from "../middlewares/customersMiddleware.js";

const router = Router();

router.get("/customers", readCustomers);
router.get("/customers/:id", validateCustomerId,readCustomersById);
router.post("/customers", validateCustomer, createCustomers);

export default router;