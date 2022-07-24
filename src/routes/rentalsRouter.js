import { Router } from "express";

import { createRentals } from "../controllers/rentalsController.js";
import { validateRental } from "../middlewares/rentalsMiddleware.js";

const router = Router();

router.post("/rentals", validateRental, createRentals);

export default router;