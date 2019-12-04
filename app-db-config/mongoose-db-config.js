var mongoose = require('mongoose');
var fs = require('fs');

var mongoPort = 27000;
var userName = "yogeshs";
var password = "yogeshs";
var mongoHost = "localhost";
var dbName = "flokapturedb";
var mongoDbUrl = `mongodb://${userName}:${password}@${mongoHost}:${mongoPort}/?ssl=true`;

mongoOpt = {
    useNewUrlParser: true,
    "sslValidate": false,
    "sslKey": fs.readFileSync('./certificates/mongodb.pem'),
    "sslCert": fs.readFileSync('./certificates/mongodb-cert.crt'),
    dbName: dbName
};

var mongooseDbServer = async function () {
    try {
        return await mongoose.connect(mongoDbUrl, mongoOpt);
    } catch (exception) {
        return new Error(JSON.stringify(exception));
    }
};
module.exports = mongooseDbServer;