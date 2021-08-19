const mongoose = require('mongoose');

module.exports = (app, config, winston) => {

    const mongodb = config.get('mongodb');

    mongoose.connect(mongodb.uris, mongodb.options)
        .then()
        .catch(err => {
            winston.log("error", "MongoDB connection failed, " + err);
            // winston.info("MongoDB connection failed, error: " + JSON.stringify(err, undefined, 2));
        });

    mongoose.connection.once('open', () => {
        // winston.info("MongoDB connection succeeded!");
    });

    mongoose.connection.on('connected', () => {
        winston.info("MongoDB connection succeeded!");
    });

    mongoose.connection.on('error', (err) => {
        mongoose.disconnect();
        // winston.info("MongoDB connection failed, error: " + err);
    });

    mongoose.connection.on('disconnected', () => {
        winston.info("MongoDB connection disconnected!");
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            winston.info('Mongoose connection disconnected through app termination!');
            process.exit(0);
        });
    });

}