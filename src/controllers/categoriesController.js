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