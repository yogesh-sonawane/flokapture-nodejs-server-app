var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var languageMasterSchema = new Schema({
    LanguageId: {
        auto: true,
        type: Schema.Types.ObjectId
    },
    LanguageName: {
        required: true,
        type: String
    },
    LanguageDescription: {
        required: false,
        type: String
    }
});

const LanguageMaster = dbConnection.model("LanguageMaster", languageMasterSchema, "LanguageMaster");

module.exports = LanguageMaster;