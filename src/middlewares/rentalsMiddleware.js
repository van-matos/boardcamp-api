import connection from "../dbStrategy/postgres.js";
import rentalsSchema from "../schemas/rentalsSchema.js";

export async function validateRental (req, res, next) {
    const { customerId, gameId } = req.body

    try {
        const { error } = rentalsSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.sendStatus(400);
        }

        const { rows: dbCustomers } = await connection.query(
            `SELECT * FROM customers WHERE id = $1`,
            [customerId]
        );

        const { rows: dbGames } = await connection.query(
            `SELECT * FROM games WHERE id = $1`,
            [gameId]
        );

        if (!dbCustomers.length || !dbGames.length) {
            return res.sendStatus(400);
        }

        res.locals.pricePerDay = dbGames[0].pricePerDay;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}