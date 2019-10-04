const {
    appFunctions
} = require('../common-lib/app-functions');
var Path = require('path');
var Fs = require('fs');
var UnZip = require('unzip');
const Multer = require('multer');

let Storage = Multer.diskStorage({
    destination: function (request, file, cb) {
        var uploadDirName = appFunctions.getParameterByName(request.url, "uploadDirName");
        var uploadPath = Path.join(__dirname, '../uploaded-projects', uploadDirName);
        if (!Fs.existsSync(uploadPath)) {
            Fs.mkdirSync(uploadPath);
        };
        var dirPath = './uploaded-projects/' + uploadDirName;
        cb(null, dirPath);
    },
    filename: function (request, file, cb) {
        cb(null, file.originalname);
    }
});
const Upload = Multer({
    storage: Storage
}).array("projectUploads", 12);

var uploadProject = function (request, response) {
    Upload(request, response, function (err) {
        if (err) {
            response.status(500).send(JSON.stringify(err));
        } else {
            response
                .status(200)
                .send(JSON.stringify({
                    status: "File(s) uploaded successfully"
                }));
        }
    });
};

var extractProject = function (uploadedPath) {
    var extractPath = path.join(__dirname, '../extracted-projects');

    if (!fs.existsSync(extractPath)) {
        fs.mkdirSync(extractPath);
    }
    fs.createReadStream(uploadedPath).pipe(UnZip.Extract({
        path: extractPath
    }).on('close', function () {
        console.log('event close');
    }));
};
module.exports = {
    uploadProject,
    extractProject
};