const express = require("express");
const routes = express.Router();
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");
const { celebrate, Segments, Joi } = require("celebrate");

//listar ongs
routes.get("/ongs", OngController.index);
//sempre que um parâmetro for uma variável, colocar entre colchetes
//criar ong
routes.post(
	"/ongs",
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			name: Joi.string().required(),
			email: Joi.string()
				.required()
				.email(),
			whatsapp: Joi.string()
				.required()
				.min(10)
				.max(11),
			city: Joi.string().required(),
			uf: Joi.string()
				.required()
				.length(2)
		})
	}),
	OngController.create
);

//listar incident
routes.get(
	"/incidents",
	celebrate({
		[Segments.QUERY]: Joi.object().keys({
			page: Joi.number()
		})
	}),
	IncidentController.index
);
//criar incident
routes.post(
	"/incidents",
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			title: Joi.string().required(),
			description: Joi.string().required(),
			value: Joi.number().required()
		}),
		[Segments.HEADERS]: Joi.object({
			authorization: Joi.string().required()
		}).unknown()
	}),
	IncidentController.create
);
//deletar incident
routes.delete(
	"/incidents/:id",
	celebrate({
		[Segments.PARAMS]: Joi.object().keys({
			id: Joi.number().required()
		})
	}),
	IncidentController.delete
);

//No caso do Segments.HEADERS, a quantidade de parametros
//não é conhecida, por isso não usa o KEYS() e sim o unknown()
//listar incidents do perfil da ong
routes.get(
	"/profile",
	celebrate({
		[Segments.HEADERS]: Joi.object({
			authorization: Joi.string().required()
		}).unknown()
	}),
	ProfileController.index
);

//Login
routes.post(
	"/sessions",
	celebrate({
		[Segments.BODY]: Joi.object().keys({
			id: Joi.string().required()
		})
	}),
	SessionController.create
);

module.exports = routes;
