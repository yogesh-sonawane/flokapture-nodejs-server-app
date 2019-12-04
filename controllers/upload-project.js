const {multerConfig} = require("../utils/multer-config");
var uploadProject = function (request, response) {
    multerConfig(request, response, function (err) {
        if (err) {
            response.status(500).send(JSON.stringify(err));
        } else {
            console.log(request.uploadDetails);
            response.status(200).send(JSON.stringify({
                status: "File(s) uploaded successfully"
            }));
        }
    });
};

module.exports = {
    uploadProject
};