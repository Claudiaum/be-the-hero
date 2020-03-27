const express = require("express");
const routes = express.Router();
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

//listar ongs
routes.get("/ongs", OngController.index);
//criar ong
routes.post("/ongs", OngController.create);

//listar incident
routes.get("/incidents", IncidentController.index);
//criar incident
routes.post("/incidents", IncidentController.create);
//deletar incident
routes.delete("/incidents/:id", IncidentController.delete);

//listar incidents do perfil da ong
routes.get("/profile", ProfileController.index);

//Login
routes.post("/sessions", SessionController.create);

module.exports = routes;
