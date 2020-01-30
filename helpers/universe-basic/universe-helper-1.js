var UnZipper = require("unzipper");
var Fs = require("fs");
const Path = require("path");

const extractProjectZip = function (projectMaster) {
    return new Promise((resolve, reject) => {
        var extractPath = Path.join(__dirname, "../", "ExtractedProjects");
        if (!Fs.existsSync(extractPath)) Fs.mkdirSync(extractPath);
        Fs.createReadStream(projectMaster.UploadDetails.CompletePath)
            .pipe(UnZipper.Extract({
                path: extractPath
            }))
            .on("error", (err) => {
                reject({
                    message: "Error occured while extracting .zip",
                    project: JSON.stringify(projectMaster),
                    error: JSON.stringify(err)
                });
            }).on("end", () => {
                resolve();
            });
        resolve();
    });
}

const vaidateDirStructure = function (rootPath) {
    const dirNames = ["Programs", "Jcl", "Include", "Menu", "I-Descriptors", "DataDictionary"];
    if (!Fs.existsSync(rootPath)) return false;

    var allDirectories = Fs.readdirSync(rootPath);
    var exist = false;
    for (const dir of allDirectories) {
        exist = dirNames.includes(dir);
        if (!exist) break;
        exist = true;
    }
    return exist;
};

const fileNameWithoutExtension = function (path) {
    var fileName = path.split('.').slice(0, -1).join('.');
    return fileName;
};

module.exports = {
    vaidateDirStructure,
    fileNameWithoutExtension,
    extractProjectZip
};