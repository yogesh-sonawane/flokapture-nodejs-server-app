var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const dbConnection = global.dbConnection;

const workspaceMasterSchema = new Schema({
    WorkspaceId: {
        auto: true,
        type: mongoose.Schema.Types.ObjectId,
        unique: true
    },
    LanguageId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    LanguageMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LanguageMaster',
        autopopulate: true
    },
    WorkspaceName: {
        type: String,
        required: true,
        unique: true
    },
    WorkspaceDescription: {
        required: false,
        type: String
    }
});

workspaceMasterSchema.pre("save", function(next){
    this.LanguageMaster = this.LanguageId;
    next();
});

const mongooseAutopopulate = require('mongoose-autopopulate');
workspaceMasterSchema.plugin(mongooseAutopopulate);

const WorkspaceMaster = dbConnection.model("WorkspaceMaster", workspaceMasterSchema, "WorkspaceMaster");

module.exports = WorkspaceMaster;