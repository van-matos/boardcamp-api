import connection from '../dbStrategy/postgres.js';

export async function readCategories (req, res) {
    try {
        const { rows: categories } = await connection.query(
            `SELECT * FROM categories`
        );

        res.send(categories);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function createCategories (req, res) {
    const { name } = req.body;

    try {
        await connection.query(
            `INSERT INTO categories (name) VALUES ($1)`, [name]
        );

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}