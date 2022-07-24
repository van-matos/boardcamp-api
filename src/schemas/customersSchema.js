import joi from "joi";

const customersSchema = joi.object({
    name: joi.string().required(),
    cpf: joi.string().regex(/[0-9]{11}/),
    phone: joi.string().regex(/[0-9]{10,11}/),
    birthday: joi.date().iso().required()
});

export default customersSchema;