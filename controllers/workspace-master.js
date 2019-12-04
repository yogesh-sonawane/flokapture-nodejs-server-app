const {WorkspaceMaster} = require("../models")
const getAll = async function(request, response){
    const workspaces = await WorkspaceMaster.find({});
    response.json(workspaces);
};
const addWorkspace = async function(request, response){
    var wp = request.body;
    const workspace = await WorkspaceMaster.create(wp);
    response.json(workspace);
};

module.exports = {getAll, addWorkspace};