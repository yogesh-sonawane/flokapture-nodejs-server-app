var homeRoutes = [
    ["api/home/get-status", "home#getStatus", "get"]
];
var languageMasterRoutes = [
    ["api/language-master/get-all-languages", "language-master#getAllLanguages", "get"],
    ["api/language-master/add-language", "language-master#addLanguage", "post"],
    ['api/language-master/find-by-id', "language-master#findById", "get"]
];
var fileContentReaderRoutes = [
    ['api/file-reader/get-file-content', "file-content-reader#readFileContent", "get"]
];
var baseCommandRoutes = [
    ["api/base-commands/get-all", "base-commands#getAll", "get"],
    ["api/base-commands/aggregate", "base-commands#aggregate", "get"],
    ["api/base-commands/add-base-command", "base-commands#addBaseCommands", "post"]
];
var uploadProjectRoutes = [
    ["api/upload-projects/upload-project", "upload-project#uploadProject", "post"]
];

const workspaceMasterRoutes = [
    ["api/workspace-master/get-all", "workspace-master#getAll", "get"],
    ["api/workspace-master/add-workspace", "workspace-master#addWorkspace", "post"]
];

const projectMasterRoutes = [
    ["api/project-master/add-project", "project-master#addProject", "post"],
    ["api/project-master/get-all", "project-master#getAll", "get"],
    ["api/project-master/start-process", "process-project#startProcess", "post"],
    ["api/project-master/get-process-steps", "project-master#getProjectProcessSteps", "get"]
];

var appRoutes = Array.prototype.concat(homeRoutes,
    languageMasterRoutes,
    fileContentReaderRoutes,
    baseCommandRoutes,
    uploadProjectRoutes,
    workspaceMasterRoutes,
    projectMasterRoutes
);

module.exports = appRoutes;