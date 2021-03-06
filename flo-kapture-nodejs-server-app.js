console.clear();
const express = require("express");
var https = require("https");
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var path = require("path");
var app = express();
const databaseServer = require("./app-db-config/database-config");

app.use(bodyParser.json({
    limit: '70mb'
}));
app.use(bodyParser.urlencoded({
    limit: '70mb',
    extended: true
}));
console.log("========================================================================");
app.use(cors());
var expressPath = require('express-path');
expressPath(app, './app-routes/api-routes.js');
var uploadPath = path.join(__dirname, 'file-uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
};
app.use(express.static(uploadPath));
var httpsOptins = {
    cert: fs.readFileSync("./certificates/device.crt"),
    key: fs.readFileSync("./certificates/device.key")
};
var portNumber = process.env.PORT || 3000;
var exressHttpsServer = https.createServer(httpsOptins, app);
exressHttpsServer.listen(portNumber, "127.0.0.1", function () {
    if (!databaseServer && !global.dbConnection) {
        console.log("==========================================================================");
        console.log(`Database connection failed!!!.  `);
        console.log("==========================================================================");
    }
    const address = this.address();
    console.log("===========================================================================");
    console.log(`floKapture Server Application is up and running on port: ${portNumber}`);
    console.log(JSON.stringify(address));
    console.log("===========================================================================");
});