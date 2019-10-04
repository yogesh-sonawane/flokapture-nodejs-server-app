var Path = require("path");
var Fs = require('fs');

var readFileContent = function (request, response) {
    var filePath = Path.join(__dirname, "../file-uploads", "sample.txt");
    var fileReader = new FileReader();
    fileReader.onload = (function (f) {
        return function (e) {
            var contents = e.target.result;
            console.log("Got the file.n" +
                "name: " + f.name + "n" +
                "type: " + f.type + "n" +
                "size: " + f.size + " bytesn" +
                "starts with: " + contents.substr(1, contents.indexOf("n"))
            );
        };
    })(f);
    var fileContent = fileReader.readAsText(f);
    console.log(fileContent);

    try {
        var data = Fs.readFileSync(filePath, 'utf8');
        console.log(data);
    } catch (e) {
        console.log('Error:', e.stack);
    };
};
exports.readFileContent = readFileContent;