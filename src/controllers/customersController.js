import dayjs from "dayjs";

import connection from '../dbStrategy/postgres.js';

export async function readCustomers (req, res) {
    const { cpf } = req.query;
    let customers;

    try {
        if (cpf) {
            const { rows: customersList } = await connection.query(
                `SELECT * FROM customers WHERE cpf LIKE '${cpf}%'`
            );
            customers = customersList;
        } else {
            const { rows: customersList } = await connection.query(
                `SELECT * FROM customers`
            );
            customers = customersList;
        }
    
        customers.map(c => c.birthday = dayjs(c.birthday).format("YYYY-MM-DD"));
    
        res.send(customers);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function readCustomersById (req, res) {
    const { customer }  = res.locals;

    try {
        customer.map(c => c.birthday = dayjs(c.birthday).format("YYYY-MM-DD"));

        res.send(customer);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function createCustomers (req, res) {
    const { name, phone, cpf, birthday } = req.body;

    try {
        await connection.query(
            `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`,
            [name, phone, cpf, birthday]
        );

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function updateCustomers (req, res) {
    const { name, phone, cpf, birthday } = req.body;
    const { id } = req.params;

    try {
        await connection.query(
            `UPDATE customers SET (name, phone, cpf, birthday) = ($1, $2, $3, $4) WHERE id = $5`,
            [name, phone, cpf, birthday, id]
        );
        
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}