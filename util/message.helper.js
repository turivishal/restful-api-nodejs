const yml = require("./yaml.helper");
const helper = require("./general.helper");

class MessageReader {

    constructor() {
    }

    // GET MESSAGE
    getParsedMessage(language, messageKey, vars = []) {
        return this.getResponseTranslation(language, messageKey, vars);
    }

    // RESPONSE MESSAGE TRANSLATOR
    getResponseTranslation(language, translationPath, vars = []) {

        let translation = yml.getYmlFromFile(this.getResponsePath(language));
        let message = helper.parseStringToObject(translationPath, translation);

        // REPLACE VARS 
        if (vars.length) message = this.replaceVars(message, vars);

        return message;

    }

    // REPLACE VARS / PARAMS
    async replaceVars(message, vars) {
        await vars.forEach((value, index) => {
            message = message.replace("{" + (index + 1) + "}", value);
        });
        return message;
    }

    // GET RESPONSE PATH
    getResponsePath(sub) {
        // return Requirelib.resolve("\\language\\" + sub + "\\" + sub + ".response.yml");
        return "./language/" + sub + "/" + sub + ".response.yml";
    }

    // GET VALIDATION PATH
    getValidationPath(sub) {
        // return Requirelib.resolve("\\language\\" + sub + "\\" + sub + ".validation.yml");
        return "./language/" + sub + "/" + sub + ".validation.yml";
    }

    // VALIDATION MERSSAGES
    validationMessage = (model, message_key) => {

        const messages = {
            // AUTH
            Auth: {
                username: {
                    'string.base': "User name should be a type of string.",
                    'string.min': "User name should have a minimum length of {#limit}.",
                    'string.max': "User name should have a maximum length of {#limit}.",
                    'string.empty': "User name cannot be an empty field.",
                    'any.required': "User name is required."
                },
                email: {
                    'string.base': "Email should be a type of string.",
                    'string.min': "Email should have a minimum length of {#limit}.",
                    'string.max': "Email should have a maximum length of {#limit}.",
                    'string.empty': "Email cannot be an empty field.",
                    'any.required': "Email is required.",
                    'string.email': "Email must be valid email address.",
                },
                password: {
                    'string.base': "Passeword should be a type of number.",
                    'string.min': "Passeword should have a minimum length of {#limit}.",
                    'string.max': "Passeword should have a maximum length of {#limit}.",
                    'string.empty': "Passeword cannot be an empty field.",
                    'any.required': "Passeword is required."
                },
                modified: {
                    'number.base': "Modified date must be a timestamp.",
                    'number.empty': "Modified date cannot be an empty field.",
                    'any.required': "Modified date is required."
                }
            },
            General: {
                searchKeyword: {
                    'string.base': "Search should be a type of string.",
                    'string.max': "Search should have a maximum length of {#limit}.",
                    'string.empty': "Search cannot be an empty field.",
                    'any.required': "Search is required."
                },
                perPage: {
                    'number.base': "Per page must be a number.",
                    'number.empty': "Per page cannot be an empty field.",
                    'number.min': "Per page should have a minimum length of {#limit}.",
                    'number.max': "Per page should have a maximum length of {#limit}.",
                    'any.required': "Per page is required."
                },
                page: {
                    'number.base': "Page must be a number.",
                    'number.empty': "Page cannot be an empty field.",
                    'number.min': "Page should have a minimum length of {#limit}.",
                    'number.max': "Page should have a maximum length of {#limit}.",
                    'any.required': "Page is required."
                },
                sortBy: {
                    'object.base': "Sort By must be a number.",
                    'object.empty': "Sort By cannot be an empty field.",
                    'any.required': "Sort By is required."
                }
            }
        };

        if (messages[model] === undefined) return {};
        if (messages[model][message_key] === undefined) return {};
        return messages[model][message_key];

    }

    // HOPI/JOI ERROR ARRAY DECODE
    joiErrorDecode = async (error) => {
        if (error) {
            let result = {};
            for (let field in error.details) result[error.details[field].path[0]] = error.details[field].message;
            return result;
        }
    }


}

module.exports = {
    'MessageReader': new MessageReader()
};