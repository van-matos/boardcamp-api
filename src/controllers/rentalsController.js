import dayjs from "dayjs";

import connection from '../dbStrategy/postgres.js';

export async function createRentals (req, res) {
    const { customerId, gameId, daysRented } = req.body;
    const { pricePerDay } = res.locals;

    try {
        await connection.query(`
            INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, [customerId, gameId, dayjs().format("YYYY-MM-DD"), daysRented, null, pricePerDay * daysRented, null]
        );

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function readRentals (req, res) {
    const { customerId, gameId } = req.query;
    let queryParams = "";

    try {
        if (customerId) {
            queryParams = `WHERE rentals."customerId" = ${customerId}`
        };

        if (gameId) {
            queryParams = `WHERE rentals."gameId" = ${gameId}`
        };

        const { rows: dbRentals } = await connection.query(`
        SELECT rentals.*,
            games.id as "gameId",
            games.name as "gameName",
            categories.id as "categoryId",
            categories.name as "categoryName",
            customers.id as "customerId",
            customers.name as "customerName" 
        FROM rentals 
        JOIN customers ON rentals."customerId" = customers.id 
        JOIN games ON rentals."gameId" = games.id 
        JOIN categories ON games."categoryId" = categories.id 
        ${queryParams}
        `);

        const rentals = formatRentals(dbRentals);

        return res.send(rentals);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

function formatRentals (dbRentals) {
    const rentals = []

    for (let rental of dbRentals) {
        const returnDate = rental.returnDate ? dayjs(rental.returnDate).format("YYYY-MM-DD") : null;

        rental = {
            ...rental,
            rentDate: dayjs(rental.rentDate).format("YYYY-MM-DD"),
            returnDate: returnDate,
            customer: {
                id: rental.customerId,
                name: rental.customerName,
            },
            game: {
                id: rental.gameId,
                name: rental.gameName,
                categoryId: rental.categoryId,
                categoryName: rental.categoryName,
            },
        };

        delete rental.customerId;
        delete rental.customerName;
        delete rental.gameId;
        delete rental.gameName;
        delete rental.categoryId;
        delete rental.categoryName;
        
        rentals.push(rental);
    }

    return rentals;
}

export async function updateRentals (req, res) {
    const { id } = req.params;
    const { daysRented, pricePerDay, rentDate } = res.locals;

    const currentDay = dayjs();
    const rentDay = dayjs(rentDate);

    const delayFee = currentDay.diff(rentDay, "day") - daysRented > 0 ? (currentDay.diff(rentDay, "day") - daysRented) * pricePerDay : 0;

    try {
        await connection.query(
            `UPDATE rentals SET ("returnDate", "delayFee") = ($1, $2) WHERE id = $3`,
            [currentDay,  delayFee, id]
        );

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deleteRentals (req, res) {
    const { id } = req.params;

    try {
        await connection.query(
            `DELETE FROM rentals WHERE id = $1`,
            [id]
        );

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}