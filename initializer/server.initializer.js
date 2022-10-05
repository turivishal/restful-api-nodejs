const winston = require('winston').loggers.get('general');

module.exports = async (app, config) => {

    const port = process.env.PORT || config.get('server.port');
    await app.listen(port, () => {
        winston.info(`We are working on ${config.get('mode').toUpperCase()} environment and Listening on port ${port}...`)
    })
    .on("error", (err) => {
        winston.error(err.message);
    });
    
}