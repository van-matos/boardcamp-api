import gamesSchema from "../schemas/gamesSchema.js";
import connection from '../dbStrategy/postgres.js';

export async function validateGame (req, res, next) {
    const { name, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        const { rows: dbCategories } = await connection.query(
            `SELECT id FROM categories`
        );
        const { rows: dbGames } = await connection.query(
            `SELECT name FROM games`
        );

        const { error } = gamesSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.sendStatus(400);
        }

        if (stockTotal <= 0 || pricePerDay <= 0 || !dbCategories.some(c => c.id === categoryId)) {
            return res.sendStatus(400);
        }

        if (dbGames.some(c => c.name === name)) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}