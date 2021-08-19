const fs = require('fs');
// require('winston-mongodb');
require('express-async-errors');

module.exports = (app, config, winston) => {

    if (!config.get('log.enable')) return false;

    // EXCEPTION
    if (config.get('log.exception.enable')) {
        const exception = config.get('log.exception');
        !fs.existsSync(exception.dir) && fs.mkdirSync(exception.dir);
        winston.handleExceptions(
            new winston.transports.Console(exception.console_options),
            new winston.transports.File({ filename: `${exception.dir}/${exception.filename}` })
        );
    }

    // UNHANDLED REJECTION
    if (config.get('log.rejection.enable'))
        process.on('unhandledRejection', (ex) => {
            throw ex;
        });

    // LOGGING
    if (config.get('log.logging.enable')) {
        const logging = config.get('log.logging');
        !fs.existsSync(logging.dir) && fs.mkdirSync(logging.dir);
        winston.add(winston.transports.File, { filename: `${logging.dir}/${logging.filename}` });
    }

    // MONGO LOG CONNECTION
    if (config.get('log.db.enable')) {
        const db = config.get('log.db');
        winston.add(winston.transports.MongoDB, {
            db: config.get('mongodb.uris'),
            collection: db.collection,
            level: db.level,
            options: db.options
        });
    }

    // process.on('uncaughtException', function(error) {
    //     if(!error.isOperational) process.exit(1);
    // });

    // process.on('unhandledRejection', function(reason, p){
    //     console.log(reason, p);
    // });

}