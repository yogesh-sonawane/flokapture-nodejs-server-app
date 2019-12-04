var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const dbConnection = global.dbConnection;

var languageMasterSchema = new Schema({
    LanguageId: {
        auto: true,
        type: Schema.Types.ObjectId,
        unique: true
    },
    LanguageName: {
        required: true,
        type: String,
        unique: true
    },
    LanguageDescription: {
        required: false,
        type: String
    }
});

const LanguageMaster = dbConnection.model("LanguageMaster", languageMasterSchema, "LanguageMaster");

module.exports = LanguageMaster;