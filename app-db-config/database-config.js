var Mongoose = require('mongoose');
var fs = require('fs');
global.dbConnection = null;

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
    "sslCert": fs.readFileSync('./certificates/mongodb-cert.crt'),
    dbName: dbName
};

var DbSetting = function () {
    var dbConfig = {
        dbUrl: `mongodb://${userName}:${password}@${mongoHost}:${mongoPort}/${dbName}?ssl=true`,
    };
    return dbConfig;
};
exports.dbSetting = DbSetting;

exports.dbServer = function () {
    Mongoose.Promise = global.Promise;
    Mongoose.set("useFindAndModify", false);
    var dbServer = Mongoose.createConnection(mongoDbUrl, mongoDbOpt);
    return dbServer;
};

exports.dbConnection = global.dbConnection = this.dbServer();

exports.apiAddress = function () {
    var apiBaseAddress = 'https://127.0.0.1:4000/api/';
    return apiBaseAddress;
};

exports.mongoDbServer = function () {
    var Db = require('mongodb').Db;
    var MongoClient = require('mongodb').MongoClient;
    var Server = require('mongodb').Server;

    return {
        Db: Db,
        Server: Server,
        Client: MongoClient
    };
};