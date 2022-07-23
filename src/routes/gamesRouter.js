import { Router } from "express";

import { createGames } from "../controllers/gamesController.js";
import { validateGame } from "../middlewares/gamesMiddleware.js";

const router = Router();

router.post("/games", validateGame, createGames);

export default router;