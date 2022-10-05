const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

module.exports = async (app) => {

    let jsDoc = swaggerJSDoc({
        swaggerDefinition: {
            ...require('../swagger.json')
        },
        apis: ['./app/**/*.js']
    });
    router.use('/', swaggerUi.serve, swaggerUi.setup(
        jsDoc,
        {
            explorer: false,
            // https://github.com/swagger-api/validator-badge
            validatorUrl: null,
            swaggerOptions: {
                displayRequestDuration: true,
                docExpansion: "none", //list"*, "full", "none"
                filter: false,
                // operationsSorter: 'alpha'
                showExtensions: true,
                showCommonExtensions: true,
                displayOperationId: true
                // More documentation will be add here
                /*
                urls: [
                    {
                        url: 'Doctor url',
                        name: 'doctor'
                    },
                    {
                        url: 'Patient url',
                        name: 'patient'
                    }
                ]
                */
            }
        }
    ));

    // SET EXPLORER RESPONSE JSON
    app.get('/api-docs.json', function (req, res) {
        res.header('Content-Type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");      
        res.send(jsDoc);
    });

    // SET SWAGGER DOCS
    app.use('/api-docs', router);

}
