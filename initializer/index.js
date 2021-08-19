module.exports = [
    require("./global.initializer"),
    require("./logging.initializer"),
    require("./swagger.initializer"),
    require("./language.initializer"),
    require("./route.initializer"),
    require("./db.initializer"),
    
    // Put this at last step ...
    require("./server.initializer")
];
