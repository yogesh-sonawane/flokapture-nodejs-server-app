const {ProjectMaster} = require("../models");

const addProject = async function(request, response){
    var pm = request.body;
    var projectMaster = await ProjectMaster.create(pm);
    response.json(projectMaster);
};
const getAll = async function (request, response) {    
    var projectMaster = await ProjectMaster.find({});
    response.json(projectMaster);
};

module.exports = {
    addProject,
    getAll
};