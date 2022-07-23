import { Router } from "express";

import { createGames, readGames } from "../controllers/gamesController.js";
import { validateGame } from "../middlewares/gamesMiddleware.js";

const router = Router();

router.get("/games", readGames);
router.post("/games", validateGame, createGames);

export default router;