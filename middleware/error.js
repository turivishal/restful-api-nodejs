const winston = require("winston");

module.exports = (error, req, res, next) => {
    winston.error(error.message, error);

    // error
    // warn
    // info
    // verbose
    // debug 
    // silly

    return Response.error(res, {
        'statusCode': 500,
        'messageKey': 'general.something_wrong',
        'description': error.message
    });
}