const {
    BaseCommandMaster
} = require("../models");

var addBaseCommands = async function (request, response) {
    var baseCommandMaster = request.body;
    var doc = await BaseCommandMaster.create(baseCommandMaster);
    response.status(200).json(doc).end();
};

var aggregate = async function (request, response) {
    var docs = await BaseCommandMaster.aggregate().exec();
    response.status(200).json(docs).end();
};

var getAll = async function (request, response) {
    var docs = await BaseCommandMaster.find({});
    response.status(200).json(docs).end();
};

module.exports = {
    addBaseCommands,
    getAll,
    aggregate
};