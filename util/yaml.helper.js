const yaml = require("yaml");
const fs = require("fs");

// GET YML CONTENT FROM FILE
exports.getYmlFromFile = (filePath) => {
    const file = fs.readFileSync(filePath, 'utf8');
    return yaml.parse(file);
}