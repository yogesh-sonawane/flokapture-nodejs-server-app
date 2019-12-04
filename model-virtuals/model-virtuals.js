const languageMasterVirtuals = {
    path: "LanguageMaster",
    value: {
        from: "LanguageMaster",
        localField: "LanguageId",
        foreignField: "_id",
        as: "LanguageMaster"
    },
    fields: ["id", "LanguageId", "LanguageName"]
};

const workspaceMasterVirtuals = {
    path: "WorkspaceMaster",
    value: {
        from: "WorkspaceMaster",
        localField: "WorkspaceId",
        foreignField: "_id",
        as: "WorkspaceMaster"
    },
    fields: ["id", "WorkspaceName", "WorkspaceDescription", "LanguageMaster"]
};

const projectMasterVirtuals = {
    path: "ProjectMaster",
    value: {
        from: "ProjectMaster",
        localField: "ProjectId",
        foreignField: "_id",
        as: "ProjectMaster"
    },
    fields: []
};

module.exports = {
    languageMasterVirtuals,
    workspaceMasterVirtuals,
    projectMasterVirtuals
};