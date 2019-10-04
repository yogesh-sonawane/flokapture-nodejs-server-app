 exports.getStatus = async function (request, response) {
    response.status(200).send("floKapture Node-Js Server Application is up and running!.").end();
};