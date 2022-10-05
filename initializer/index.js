const config = require('config');
const express = require('express');
const app = express();

require("./global.initializer")(app, config);
require("./validation.initializer")(app, config);
require("./logging.initializer")(app, config);
require("./swagger.initializer")(app, config);
require("./language.initializer")(app, config);
require("./route.initializer")(app, config);
require("./db.initializer")(app, config);

// Put this at last step ...
require("./server.initializer")(app, config);
