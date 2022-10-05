module.exports = async (app, config) => {

    app.use((req, res, next) => {

        // SET LANGUAGE FROM HEADER OR NOT THEN SET DEFAULT
        LanguageSession.setLanguage(req.headers[config.get('languages.header.key')]);

        next();

    });

}