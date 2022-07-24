import { Router } from "express";

import { createRentals, readRentals } from "../controllers/rentalsController.js";
import { validateRental } from "../middlewares/rentalsMiddleware.js";

const router = Router();

router.get("/rentals", readRentals);
router.post("/rentals", validateRental, createRentals);

export default router;