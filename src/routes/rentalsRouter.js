import { Router } from "express";

import { createRentals, readRentals, updateRentals } from "../controllers/rentalsController.js";
import { validateRental, validateRentalReturn } from "../middlewares/rentalsMiddleware.js";

const router = Router();

router.get("/rentals", readRentals);
router.post("/rentals", validateRental, createRentals);
router.post("/rentals/:id/return", validateRentalReturn, updateRentals);

export default router;