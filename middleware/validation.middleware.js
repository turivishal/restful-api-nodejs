const mongoose = require('mongoose');
const Joi = require('../util/joi.helper');
const _ = require('lodash');

exports.request = (Model, module) => {
    return async (req, res, next) => {
        try {
            const error = !Model.DtoValidations[module] ? 1 : await Joi.validate(_.omit(req.body, ['user']), Model.DtoValidations[module]);
            if (error) return Response.error(res, {
                'statusCode': 400,
                'messageKey': 'general.validation_failed',
                'data': error
            });
            else next();
        }
        catch (error) {
            next(error);
        }
    }
}

// VALIDATE OBJECT ID
module.exports.validateObjectId = (ids = []) => {
    return async (req, res, next) => {
        try {
            if (ids.some((id) => mongoose.Types.ObjectId.isValid(req.params[id]) != true)) return Response.error(res, {
                'statusCode': 400,
                'messageKey': 'general.invalid_id'
            });
            else next();
        }
        catch (error) {
            next(error);
        }
    }
}