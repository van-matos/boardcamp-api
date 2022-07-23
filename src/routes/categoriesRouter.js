import { Router } from "express";

import { readCategories } from "../controllers/categoriesController.js";

const router = Router();

router.get("/categories", readCategories);

export default router;