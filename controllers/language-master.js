var {
    LanguageMaster
} = require("../models");

var getAllLanguages = async function (request, response) {
    var languageMasters = await LanguageMaster.find({});
    response.status(200).json(languageMasters).end();
};
var addLanguage = async function (request, response) {
    var languageMaster = request.body;
    var doc = await LanguageMaster.create(languageMaster);
    response.status(200).json(JSON.stringify(doc)).end();
};

var findById = async function (request, response) {
    var languageId = 1;
    var LanguageMaster = dbConnection.model('LanguageMaster', languageMasterSchema, 'LanguageMaster');
    var languageMaster = await LanguageMaster.findOne({
        LanguageId: languageId
    });
    response.status(200).json(languageMaster).end();
};
module.exports = {
    getAllLanguages,
    addLanguage,
    findById
}