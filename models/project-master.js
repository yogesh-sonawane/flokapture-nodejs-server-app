var mongoose = require('mongoose');
var {
    languageMasterVirtuals,
    workspaceMasterVirtuals
} = require("../model-virtuals/model-virtuals");
var Schema = mongoose.Schema;
const dbConnection = global.dbConnection;

const projectMasterSchema = new Schema({
    ProjectId: {
        auto: true,
        unique: true,
        type: mongoose.Types.ObjectId
    },
    ProjectName: {
        type: String,
        required: true,
        unique: true
    },
    ProjectDescription: {
        type: String,
        required: false
    },
    WorkspaceId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    LanguageId: {
        type: mongoose.Types.ObjectId,
        required: false
    },
    LanguageMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LanguageMaster',
        autopopulate: true
    },
    WorkspaceMaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkspaceMaster',
        autopopulate: true
    },
    UploadedPath: {
        type: String,
        default: ""
    },
    ExtractedPath: {
        type: String,
        default: ""
    },
    IsActive: {
        type: Boolean,
        default: true
    },
    IsCtCode: {
        type: Boolean,
        default: false
    },
    UploadDetails: {
        FileName: {
            type: String
        },
        UploadPath: {
            type: String
        },
        CompletePath: {
            type: String
        }
    },
    UploadedOn: {
        type: Date,
        required: false,
        default: new Date(),
        get: function (v) {
            return v.toLocaleDateString("en-us");
        }
    },
    ProcessedOn: {
        type: Date,
        required: false,
        default: null,
        get: function (v) {
            if (typeof v === "undefined" || v === null) return null;
            return v.toLocaleDateString("en-us");
        }
    },
    TotalObjects: {
        type: Number,
        required: false,
        default: 0
    },
    Status: {
        type: Boolean,
        default: true,
        required: false,
        get: function (v) {
            return v ? "Yes" : "No";
        }
    },
    ProcessingStatus: {
        type: String,
        required: false,
        default: "Not Processed"
    }
});

projectMasterSchema.pre("save", function (next) {
    this.LanguageMaster = this.LanguageId;
    this.WorkspaceMaster = this.WorkspaceId;
    next();
});

projectMasterSchema.pre("aggregate", function (next) {
    this.lookup(languageMasterVirtuals.value)
        .unwind(languageMasterVirtuals.path);
    this.lookup(workspaceMasterVirtuals.value)
        .unwind(workspaceMasterVirtuals.path);
    next();
});

projectMasterSchema.set('toJSON', {
    virtuals: true,
    getters: true
});
projectMasterSchema.set('toObject', {
    virtuals: true,
    getters: true
});

const mongooseAutopopulate = require('mongoose-autopopulate');
projectMasterSchema.plugin(mongooseAutopopulate);

const ProjectMaster = dbConnection.model("ProjectMaster", projectMasterSchema, "ProjectMaster");

module.exports = ProjectMaster;