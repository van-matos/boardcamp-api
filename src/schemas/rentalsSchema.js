import joi from "joi";

const rentalsSchema = joi.object({
    customerId: joi.number().integer().positive().required(),
    gameId: joi.number().integer().positive().required(),
    daysRented: joi.number().integer().positive().required()
});

export default rentalsSchema;