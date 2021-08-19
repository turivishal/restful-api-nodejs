const express = require('express');
const router = express.Router();
const error = require('../middleware/error');
var cors = require('cors')

module.exports = async (app, config, winston) => {

    const routes = config.get('routes');

    // ENABLE CORS
    const corsMiddleware = cors(routes.cors);
    if (routes.corsRoot && routes.corsRoot.check) {
        app.use((req, res, next) => {
            if (req.header('origin') && req.header('origin').endsWith(routes.corsRoot.origin))
                return corsMiddleware(req, res, next);
            else return next();
        });
    } else {
        app.use(corsMiddleware);
    }

    // REQUEST BODY PARAMTERS WAYS / PREPROCESSOR
    if (routes.request.raw) app.use(express.json());
    if (routes.request.form_urlencoded) {
        app.use(express.json(routes.request.form_urlencoded.options));
        app.use(express.urlencoded(routes.request.form_urlencoded.urlencoded_options));
    }

    // LOAD APP ROUTES
    require('../util/general.helper').bootstrap('../app/app.route', [router]);

    // SET ROUTE
    app.use('/api', router);
    // ERROR
    app.use(error);

}