import { Router } from "express";

import { createRentals, deleteRentals, readRentals, updateRentals } from "../controllers/rentalsController.js";
import { validateRental, validateRentalDelete, validateRentalReturn } from "../middlewares/rentalsMiddleware.js";

const router = Router();

router.get("/rentals", readRentals);
router.post("/rentals", validateRental, createRentals);
router.post("/rentals/:id/return", validateRentalReturn, updateRentals);
router.delete("/rentals/:id", validateRentalDelete, deleteRentals);

export default router;