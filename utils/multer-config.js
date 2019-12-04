var Path = require('path');
var Fs = require('fs');
const Multer = require('multer');
let Storage = Multer.diskStorage({
    destination: function (request, file, cb) {
        var uploadDirName = request.query.uploadDirName; // .getParameterByName(request.url, "uploadDirName");
        var uploadPath = Path.join(__dirname, '../', uploadDirName);
        if (!Fs.existsSync(uploadPath)) {
            Fs.mkdirSync(uploadPath);
        };
        var dirPath = './' + uploadDirName;
        cb(null, dirPath);
    },
    filename: function (request, file, cb) {
        var uploadDirName = request.query.uploadDirName;
        var uploadPath = Path.join(__dirname, '../', uploadDirName);
        var completePath = Path.join(uploadPath, file.originalname);
        request.uploadDetails = {
            FileName: file.originalname,
            UploadPath: uploadPath,
            CompletePath: completePath
        };
        cb(null, file.originalname);
    }
});
const Upload = Multer({
    storage: Storage
}).array("uploads", 12);

module.exports.multerConfig = Upload;