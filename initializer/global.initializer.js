module.exports = (app, config, winston) => {

    // SET RESPONSE HELPER
    global.Response = require("../util/response.helper");

    // INITIALIZE FOR LANGUAGE COMING FROM HEADER
    global.LanguageSession = require('../util/language-session.helper');

    // GET ROOT PATH
    global.Requirelib = require('app-root-path');

}