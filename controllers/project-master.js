const {
    ProjectMaster,
    ProjectProcessingSteps
} = require("../models");
const {
    extractProjectZip
} = require("../helpers");

const addProject = async function (request, response) {
    var pm = request.body;
    var projectMaster = await ProjectMaster.create(pm);
    await addProjectProcessingSteps(projectMaster._id);
    extractProjectZip(projectMaster)
        .then(() => {
            response.json(projectMaster);
        }).catch((err) => {
            response.json(err);
        });
};
const getAll = async function (request, response) {
    var projectMaster = await ProjectMaster.find({});
    response.json(projectMaster);
};

const getProjectProcessSteps = async function (request, response) {
    var projectId = request.query.projectId;
    var processingSteps = await ProjectProcessingSteps.find({
        ProjectId: projectId
    });
    response.json(processingSteps);
};

const universeProcessingSteps = [{
    StepName: "ConfirmDirectoryStructure",
    StepDesc: "Confirm directory dtructure with necessory files",
    CanReprocess: false
}, {
    StepName: "ChangeFileExtenstions",
    StepDesc: "Change file extenstions depending upon directory structure like .jcl, .icd",
    CanReprocess: false
}, {
    StepName: "ExtractFileDetails",
    StepDesc: "Extract all file details in file master details table",
    CanReprocess: false
}, {
    StepName: "ExtractFileMenuData",
    StepDesc: "Extract Menu file details information",
    CanReprocess: false
}, {
    StepName: "UploadDataDictionary",
    StepDesc: "Upload Data Dictionary details",
    CanReprocess: false
}, {
    StepName: "ProcessForUniverseDescriptor",
    StepDesc: "Upload UniVerse Descriptor details",
    CanReprocess: false
}, {
    StepName: "ProcessUniVerseJcls",
    StepDesc: "Process for JCL (.jcl) files",
    CanReprocess: false
}, {
    StepName: "ProcessUniversePrograms",
    StepDesc: "Process for Program (.pgm) files",
    CanReprocess: false
}, {
    StepName: "ProcessUniVerseSubRoutinesAndIncludes",
    StepDesc: "Process for Subroutines and Includes (.sbr, .icd) files",
    CanReprocess: false
}, {
    StepName: "ProcessForFileContent",
    StepDesc: "Process for file contents like removing empty lines, commented lines etc...",
    CanReprocess: true,
    TableName: "FileContentMaster"
}];
const addProjectProcessingSteps = async function (projectId) {
    for (const step of universeProcessingSteps) {
        var processingStep = {
            ProjectId: projectId,
            StepName: step.StepName,
            StepDescription: step.StepDesc,
            StartedOn: null,
            CompletedOn: null,
            CanReprocess: step.CanReprocess,
            ReProcessDetails: {
                TableName: step.CanReprocess ? step.TableName : ""
            }
        };
        await ProjectProcessingSteps.create(processingStep);
    }
};

module.exports = {
    addProject,
    getAll,
    getProjectProcessSteps
};