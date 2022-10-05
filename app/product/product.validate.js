const Joi = require("joi");
const { MessageReader } = require("../../util/message.helper");
const MongoRepository = require("../../util/mongo.repository.helper");

// JOI SCHEMA VALIDATIONS
module.exports.validations = (Model, Payload) => {

    // SORTING PROPERTIES JOI VALIDATION
    let SortingPropertiesValidation = {};
    Payload.SortingProperties.forEach(element => {
        SortingPropertiesValidation[element] = Joi.string()
            .valid(...MongoRepository.sortOrdersKey)
            .messages(MessageReader.validationMessage(Model, element))
    });

    return {
        name: Joi.string().required().messages(MessageReader.validationMessage(Model, 'name')),
        category: Joi.string().required().messages(MessageReader.validationMessage(Model, 'category')),
        quantity: Joi.number().required().messages(MessageReader.validationMessage(Model, 'quantity')),
        price: Joi.number().required().messages(MessageReader.validationMessage(Model, 'price')),
        moreInfo: Joi.object().messages(MessageReader.validationMessage(Model, 'moreInfo')),
        activeStatus: Joi.alternatives(
            Joi.number().valid(...Payload.ActiveStatus),
            Joi.array().items(Joi.number().valid(...Payload.ActiveStatus))
        ).messages(MessageReader.validationMessage(Model, 'activeStatus')),
        
        searchKeyword: Joi.string().max(50).allow('').messages(MessageReader.validationMessage('General', 'searchKeyword')),
        perPage: Joi.number().min(1).max(1000).messages(MessageReader.validationMessage('General', 'perPage')),
        page: Joi.number().min(1).messages(MessageReader.validationMessage('General', 'page')),
        sortBy: Joi.object().keys(SortingPropertiesValidation).messages(MessageReader.validationMessage('General', 'sortBy'))
    }

}