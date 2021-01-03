import { request, use, expect } from "chai";
import chaiHttp from "chai-http";
import {
	APIRes,
	Bootstrap,
	Controller,
	Get,
	HTTPStatus,
	Ip,
	Param,
	Query,
} from "..";
import express from "express";
import { Server } from "http";

use(chaiHttp);
let listener: Server;
let app: express.Express;

describe("Param Decorators", () => {
	before(() => {
		@Controller("/test")
		class TestController {
			@Get("/:user/:player")
			getIndex(
				@Param("user") user: string,
				@Param("player") player: string,
				@Query("test") test: string,
				@Query("lorem") lorem: string,
				@Ip() ip: string,
			): APIRes<{
				user: string;
				player: string;
				test: string;
				lorem: string;
				ip: string;
			}> {
				return {
					statusCode: HTTPStatus.OK,
					message: "Test controller",
					data: {
						user,
						test,
						ip,
						lorem,
						player,
					},
				};
			}
		}
		app = express();
		listener = Bootstrap(app, [TestController], 3000);
	});

	it("Using Param Decorators", (done) => {
		request(app)
			.get("/test/Sidra/PlayerOne?test=lorem&lorem=impsum")
			.end((_, res) => {
				expect(res.body).to.haveOwnProperty("statusCode", 200);
				expect(res.body).to.haveOwnProperty(
					"message",
					"Test controller",
				);
				expect(res.body).to.haveOwnProperty("data");
				expect(res.body.data).to.haveOwnProperty("user", "Sidra");
				expect(res.body.data).to.haveOwnProperty("player", "PlayerOne");
				expect(res.body.data).to.haveOwnProperty("test", "lorem");
				expect(res.body.data).to.haveOwnProperty("lorem", "impsum");
				expect(res.body.data).to.haveOwnProperty("ip");
				done();
			});
	});

	after((done) => {
		listener.close(done);
	});
});
