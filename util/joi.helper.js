const Joi = require("joi");
const { MessageReader } = require("./message.helper");

// VALIDATE VALIDATIONS
module.exports.validate = async (schema, validations) => {
    const { error } = await Joi.object(validations).validate(schema, { abortEarly: false });
    return MessageReader.joiErrorDecode(error);
}