const {
    outputFile
} = require('fs-extra');

async function writeToFile(path, content) {
    try {
        await outputFile(path, content)
    } catch (error) {
        console.log(`Error in writing a file `, e, path);
    }
}

module.exports = {
    writeToFile
}