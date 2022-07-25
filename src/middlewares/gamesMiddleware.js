import connection from '../dbStrategy/postgres.js';
import gamesSchema from "../schemas/gamesSchema.js";

export async function validateGame (req, res, next) {
    const { name, categoryId } = req.body;

    try {
        const { rows: dbCategories } = await connection.query(
            `SELECT * FROM categories WHERE id = $1`,
            [categoryId]
        );
        const { rows: dbGames } = await connection.query(
            `SELECT * FROM games WHERE name = $1`,
            [name]
        );

        const { error } = gamesSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.sendStatus(400);
        }

        if (!dbCategories.length) {
            return res.sendStatus(400);
        }

        if (dbGames.length) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}