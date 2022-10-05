require('express-async-errors');
const winston = require("winston");

module.exports = (app, config) => {

    //@ { error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 }
    const log = config.get('log');
    winston.loggers.add('general', {
        format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
            winston.format.json()
        ),
        transports: [
            new winston.transports.Console({ level: log.logging.level, format: winston.format.simple() }),
            new winston.transports.File({ filename: log.logging.path, level: log.logging.level }),
            new winston.transports.File({ filename: log.exception.path, level: log.exception.level })
        ],
        level: log.level,
        silent: !config.get('log.enable'),
        exitOnError: false
    });

    // UNHANDLED REJECTION
    if (config.get('log.rejection.enable')) process.on('unhandledRejection', (ex) => { throw ex; });

}