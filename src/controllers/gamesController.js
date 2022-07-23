import connection from '../dbStrategy/postgres.js';

export async function readGames (req, res) {
    const { name } = req.query;
    let games;

    try {
        if (name) {
            const { rows: gamesList } = await connection.query(
                `SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE LOWER(games.name) LIKE LOWER('${name}%')`
            )
            games = gamesList;
        } else {
            const { rows: gamesList } = await connection.query(
                `SELECT games.*, categories.name as "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id`
            )
            games = gamesList;
        }
    
        res.send(games);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }   
}

export async function createGames (req, res) {
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try {
        await connection.query(
            `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
            [name, image, stockTotal, categoryId, pricePerDay]
        );

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}