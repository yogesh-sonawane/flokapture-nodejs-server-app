const mongoDb = require('mongodb').MongoClient;
var fs = require('fs');

var mongoPort = 27000;
var userName = "yogeshs";
var password = "yogeshs";
var mongoHost = "localhost";
var dbName = "flokapturedb";
var mongoDbUrl = `mongodb://${userName}:${password}@${mongoHost}:${mongoPort}/?ssl=true`;

mongoDbOpt = {
    useNewUrlParser: true,
    "sslValidate": false,
    "sslKey": fs.readFileSync('./certificates/mongodb.pem'),
    "sslCert": fs.readFileSync('./certificates/mongodb-cert.crt')
};

var mongoDbServer = async function () {
    try {
        var mongoClient = await mongoDb.connect(mongoDbUrl, mongoDbOpt);
        var mongoDatabase = mongoClient.db(dbName);
        var adminDb = mongoClient.db("admin").admin();
        return {
            mongoClient,
            mongoDatabase,
            adminDb
        };
    } catch (exception) {
        return new Error(JSON.stringify(exception));
    }
};


module.exports = mongoDbServer;