const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {

    let token = req.header(config.get("gateway_auth.auth_token_key"));
    if (!token) Response.error(res, {
        'status': false,
        'statusCode': 401,
        'messageKey': 'auth.no_auth',
    });

    try {
        // TODO NEED TO CREATE PROPER VALIDATION
        token = token.replace("Bearer ", "");
        req.body.user = jwt.verify(token, config.get("gateway_auth.secret"));
        next();
    }
    catch (error) {
        Response.error(res, {
            'status': false,
            'statusCode': 500,
            'description': error.message,
        });    
        // next(error);
    }

}