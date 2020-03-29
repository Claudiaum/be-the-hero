const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
	beforeEach(async () => {
		//é sempre bom ter um banco de dados limpo
		//já que a criação infinita ocupa espaço e pode influenciar
		//em outros testes
		await connection.migrate.rollback();
		await connection.migrate.latest();
	});

	afterAll(async () => {
		await connection.destroy();
	});

	//para enviar um header, basta acrescentar depois de post
	//set('authorization','asdas');
	it("should be able to create a new ONG", async () => {
		const response = await request(app)
			.post("/ongs")
			.send({
				name: "Lar Dogs Teste",
				email: "testes@teste.com",
				whatsapp: "62919191919",
				city: "Rialma",
				uf: "GO"
			});

		expect(response.body).toHaveProperty("id");
		expect(response.body.id).toHaveLength(8);
	});
});
