const langParser = require("accept-language-parser");
const config = require("config");

class LanguageSession {

    languages;
    language;
    languageDefault;

    constructor() {

        // SET LANGUAGES
        this.setLanguages(config.get("languages.all"));

        // SET DEFAULT LANGUAGE
        this.setDefaultLanguage(config.get("languages.default"));

    }

    // SET DEFAULT LANGUAGE
    setDefaultLanguage(languageDefault) {
        this.languageDefault = languageDefault;
    }

    // INITIALIZE ALL LANGUAGES 
    setLanguages(defaultLanguages) {
        this.languages = defaultLanguages;
    }

    // GET ALL LANGUAGES
    getLanguages() {
        return this.languages;
    }

    // GET DAFAULT LANGUAGE
    getDefaultLanguage() {
        return this.languageDefault;
    }

    // SET LANGUAGE
    setLanguage(languageHeader) {
        // IF INITIALIZED LANG EMPTY TEHN ASSIGN DEFAULT LANGUAGE
        this.language = this.parseLanguage(this.getLanguages(), languageHeader) || this.getDefaultLanguage();
    }

    // GET LANGUAGE
    getLanguage() {
        return this.language || this.getDefaultLanguage();
    }

    // PARSE / VALIDATE LANGUAGE FROM HEADER
    parseLanguage(allLanguages, langHeader) {
        return langParser.pick(allLanguages, langHeader);
    }

}

// module.exports = (defaultLanguages) => { return new LanguageSession(defaultLanguages) }
module.exports = new LanguageSession();