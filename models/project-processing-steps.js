var mongoose = require('mongoose');
var moment = require("moment");
var Schema = mongoose.Schema;
const dbConnection = global.dbConnection;

const processingStepsSchema = new Schema({
    ProcessingStepId: {
        auto: true,
        type: mongoose.Types.ObjectId
    },
    ProjectId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    StepName: {
        type: String,
        required: true,
        default: ""
    },
    StepDescription: {
        type: String,
        required: true,
        default: ""
    },
    StartedOn:{
        type: Date,
        required: false,
        default: null,
         get: function (v) {
             if (typeof v === "undefined" || v === null) return null;
             var mom = moment(v).format("MM/dd/yyyy hh:mm:ss a");
             return mom;
         }
    },
    CompletedOn:{
        type: Date,
        required: false,
        default: null,
        get: function(v){
           if (typeof v === "undefined" || v === null) return null;
           var mom = moment(v).format("MM/dd/yyyy hh:mm:ss a");
           return mom;
        }        
    },
    CanReprocess: {
        type: Boolean,
        default: false        
    },
    ReProcessDetails: {
        TableName: {
            type: String,
            required: false,
            default: ""
        }
    }
});

const ProjectProcessingSteps = dbConnection.model("ProjectProcessingSteps", processingStepsSchema, "ProjectProcessingSteps");

module.exports = ProjectProcessingSteps;