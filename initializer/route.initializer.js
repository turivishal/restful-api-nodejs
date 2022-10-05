const express = require('express');
const router = express.Router();
const error = require('../middleware/error');
const cors = require('cors');
const compression = require('compression');

// ENDS WITH ORIGIN CHECK
function endsWith(origin, origins) {
    return origins.map((o) => origin.endsWith(o)).includes(true);
}

module.exports = async (app, config) => {

    const routes = config.get('routes');

    // ENABLE CORS
    const corsMiddleware = cors(routes.cors);
    if (routes.corsRoot && routes.corsRoot.check) {
        app.use((req, res, next) => {
            if (req.header('origin') && endsWith(req.header('origin'), routes.corsRoot.origin))
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

    // SECURITY
    app.disable('x-powered-by');
    app.use(compression({ threshold: 0 })); // level: 6

    // SET ROUTE
    app.use('/api', router);
    
    // LOAD APP ROUTES
    require('../util/general.helper').bootstrap('../app/app.route', [router]);
    
    // ERROR
    app.use(error);

}