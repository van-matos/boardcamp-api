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

        const { rows: dbRentals } = await connection.query(
            `SELECT * FROM rentals WHERE "gameId" = $1`,
            [gameId]
        );

        if (!dbCustomers.length || !dbGames.length || dbRentals.length + 1 > dbGames[0].stockTotal) {
            return res.sendStatus(400);
        }

        res.locals.pricePerDay = dbGames[0].pricePerDay;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function validateRentalReturn (req, res, next) {
    const { id } = req.params;

    try {
        const { rows: dbRental } = await connection.query(`
            SELECT rentals.id, rentals."returnDate", rentals."rentDate", rentals."daysRented", games."pricePerDay"
            FROM rentals 
            JOIN games 
            ON rentals."gameId"=games.id 
            WHERE rentals.id=$1
        `, [id]
        );

        if (!dbRental.length) {
            return res.sendStatus(404);
        }

        if (dbRental[0].returnDate) {
            return res.sendStatus(400);
        }

        res.locals.daysRented = dbRental[0].daysRented;
        res.locals.rentDate = dbRental[0].rentDate;
        res.locals.pricePerDay = dbRental[0].pricePerDay;

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function validateRentalDelete (req, res, next) {
    const { id } = req.params;

    try {
        const { rows: dbRental } = await connection.query(
            `SELECT "returnDate" FROM rentals WHERE rentals.id = $1`,
            [id]
        );

        if (!dbRental.length) {
            return res.sendStatus(404);
        }

        if (!dbRental[0].returnDate) {
            return res.sendStatus(400);
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}