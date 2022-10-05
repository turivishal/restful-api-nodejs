const config = require("config");
//@ const jwt = require('jwt-simple');
const bcrypt = require("bcryptjs");
const _ = require("lodash");

// GET DATE
exports.getDate = () => {
    return new Date(Date.now()).toISOString();
}

// DECODE USER ID FROM JWT
exports.get_user_id = (req) => {
    const usertoken = req.header(config.get('header.auth_token_key'));
    return jwt.decode(usertoken, config.get('jwt.secret'));
}

// LOAD DEPENDANCY / FILES
exports.bootstrap = async (uri, modules) => {
    const index = require(uri);
    for (let init of index) { await init(...modules); }
}

// PARSE STRING TO OBJECT
exports.parseStringToObject = (configPath, obj) => {
    let configArray = configPath.split(".")
    let currentObjLevel = obj;
    configArray.forEach(path => {
        currentObjLevel = currentObjLevel[path];
    });
    return currentObjLevel;
}

// PASSWORD HASH GENERATE
exports.passwordHashGen = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// COMBINE 2 OBJECTS, FIRST WILL BE PRIMARY, AND REMOVE EMPTY VALUE KEY
exports.mergeWithEmpty = async (primaryObj, SecondaryObj) => {
    return _.omitBy(_.mergeWith({}, SecondaryObj, primaryObj, (o, s) => o ? o : s), _.isEmpty);
}

// CONVERT MB TO BYTES
exports.MBtoByes = (mb) => {
    return (1024 * 1024 * mb);
}