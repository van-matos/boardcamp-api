import { Router } from "express";

import { readCustomers } from "../controllers/customersController.js";

const router = Router();

router.get("/customers", readCustomers);

export default router;