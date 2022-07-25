import connection from '../dbStrategy/postgres.js';
import categoriesSchema from "../schemas/categoriesSchema.js";

export async function validateCategory (req, res, next) {
    const { name } = req.body;

    try {
        const { error } = categoriesSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.sendStatus(400);
        }

        const { rows: dbCategories } = await connection.query(
            `SELECT * FROM categories WHERE name = $1`,
            [name]
        );

        if (dbCategories.length) {
            return res.sendStatus(409);
        }

        next ();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}