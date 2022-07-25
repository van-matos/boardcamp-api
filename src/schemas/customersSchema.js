import joi from "joi";

const customersSchema = joi.object({
    name: joi.string().required(),
    cpf: joi.string().length(11).required(),
    phone: joi.string().min(10).max(11).required(),
    birthday: joi.date().max(Date.now()).required()
});

export default customersSchema;