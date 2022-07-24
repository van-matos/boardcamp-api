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
            `SELECT * FROM customers WHERE cpf = $1`,
            [cpf]
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

export async function validateCustomerId (req, res, next) {
    const { id } = req.params;

    try {
        const { rows: dbCustomer } = await connection.query(
            `SELECT * FROM customers WHERE id = $1`,
            [id]
        );
    
        if (!dbCustomer.length) {
            return res.sendStatus(404);
        }
        
        res.locals.customer = dbCustomer;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }    
}