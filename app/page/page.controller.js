// URL NOT FOUND
module.exports.urlNotFound = async (req, res, next) => {
    Response.error(res, {
        'statusCode': 404,
        'messageKey': 'general.url_not_found'
    });
}