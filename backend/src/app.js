const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const { errors } = require("celebrate");

app.use(cors());
// Para receber parâmetros com JSON
app.use(express.json());
app.use(routes);
app.use(errors());

/**
 * Métodos HTTP:
 *
 * GET: Buscar uma informação do back-end
 * 	- Método padrão do browser
 * POST: Criar uma informação no back-end
 * PUT: Alerar alguma informação do back-end
 * DELETE: Remover alguma informação do back-end
 */

/**
 * Tipos de parâmetros:
 *
 * Query Params: Parâmetros nomeado enviados na rota após "?" (?user=Claudio&id=12)
 *  -> request.query
 * Route Params: Parâmetros utilizados para identificar recursos (/:id -> /1)
 * 	-> request.params
 * Request body: Corpo da requisição, utilizado para criar ou alterar recursos
 *  -> Post -> receber via json
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 */

// app.listen(3333);
module.exports = app;
