import { Router } from "express";

import { createCategories, readCategories } from "../controllers/categoriesController.js";
import { validateCategory } from "../middlewares/categoriesMiddleware.js";

const router = Router();

router.get("/categories", readCategories);
router.post("/categories", validateCategory, createCategories);


export default router;