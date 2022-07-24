import customersSchema from "../schemas/customersSchema.js";
import connection from '../dbStrategy/postgres.js';

export async function validateCustomer (req, res, next) {
    const { cpf } = req.body;

    try {
        const { error } = customersSchema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.sendStatus(400);
        }

        const { rows: dbCustomers } = await connection.query(
            `SELECT cpf FROM customers`
        );

        if (dbCustomers.some( c => c.cpf === cpf)) {
            return res.sendStatus(409);
        }

        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}