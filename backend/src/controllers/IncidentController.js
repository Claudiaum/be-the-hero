const connection = require("../database/connection");

module.exports = {
	async index(req, res) {
		const { page = 1 } = req.query;

		const [count] = await connection("incidents").count();
		//[count] = count[0]
		console.log(count, count["count(*)"]);
		res.header("X-Total-Count", count["count(*)"]);

		//nesse caso como as duas tem a colua Id, eles irão se
		//sobrepor se for usado o select('*')
		const incidents = await connection("incidents")
			.join("ongs", "ongs.id", "=", "incidents.ong_id")
			.limit(5)
			.offset((page - 1) * 5)
			.select([
				"incidents.*",
				"ongs.name",
				"ongs.email",
				"ongs.whatsapp",
				"ongs.city",
				"ongs.uf"
			]);

		return res.json({ incidents });
	},

	async create(req, res) {
		const { title, description, value } = req.body;
		const ong_id = req.headers.authorization;

		const [id] = await connection("incidents").insert({
			title,
			description,
			value,
			ong_id
		});

		return res.json({ id });
	},

	async delete(req, res) {
		const { id } = req.params;
		const ong_id = req.headers.authorization;

		const incidents = await connection("incidents")
			.where("id", id)
			.select("ong_id")
			.first();

		if (incidents.ong_id !== ong_id) {
			//autorização negada
			return res.status(401).json({ error: "Operation not permited." });
		}

		await connection("incidents")
			.where("id", id)
			.delete();

		//204 - confirmação sem corpo
		//send(), resposta de corpo vazia
		return res.status(204).send();
	}
};
