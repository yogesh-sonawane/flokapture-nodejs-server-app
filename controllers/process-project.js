var Fs = require("fs");
const Path = require("path");
const {
    ProjectMaster
} = require("../models");
const {
    vaidateDirStructure,
    fileNameWithoutExtension
} = require("../helpers");

var startProjectProcessing = async function (request, response) {
    let projectMaster = request.body;
    // var extracted = await extractProjectZip(projectMaster);
    const fileName = fileNameWithoutExtension(projectMaster.UploadDetails.FileName);
    ProjectMaster.findByIdAndUpdate(projectMaster._id, {
        ExtractedPath: Path.join(extractPath, fileName)
    }, {
        new: true,
        runValidators: true
    }, (err, doc) => {
        var isValid = vaidateDirStructure(doc.ExtractedPath);
        if (!isValid) {
            response.status(500).send("Directory structure is not valid!");
        } else {
            response.json("Project started for processing");
        }
    });
};



module.exports.startProcess = startProjectProcessing;