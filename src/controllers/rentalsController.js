import dayjs from "dayjs";

import connection from '../dbStrategy/postgres.js';

export async function createRentals (req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const { pricePerDay } = res.locals;

    try {
        await connection.query(
            `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [customerId, gameId, dayjs().format("YYYY-MM-DD"), daysRented, null, pricePerDay * daysRented, null]
        );

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}