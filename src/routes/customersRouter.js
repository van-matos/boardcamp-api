import { Router } from "express";

import { createCustomers, readCustomers } from "../controllers/customersController.js";
import { validateCustomer } from "../middlewares/customersMiddleware.js";

const router = Router();

router.get("/customers", readCustomers);
router.post("/customers", validateCustomer, createCustomers);

export default router;