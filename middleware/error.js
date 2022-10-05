const winston = require('winston').loggers.get('general');

module.exports = (error, req, res, next) => {
    winston.error(error.message, error);
    return Response.error(res, {
        'statusCode': 500,
        'messageKey': 'general.something_wrong',
        'description': error.message
    });
}