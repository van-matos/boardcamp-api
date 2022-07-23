import joi from "joi";

const gamesSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().integer().required(),
    pricePerDay: joi.number().integer().required(),
    categoryId: joi.number().integer().required()
});

export default gamesSchema;