const BaseCommandMaster = require("../models/base-command-reference");
const LanguageMaster = require("../models/language-master-schema");
const WorkspaceMaster = require("../models/workspace-master");
const ProjectMaster = require("../models/project-master");
const ProjectProcessingSteps = require("../models/project-processing-steps");

module.exports = {
    LanguageMaster,
    WorkspaceMaster,
    BaseCommandMaster,
    ProjectMaster,
    ProjectProcessingSteps
};