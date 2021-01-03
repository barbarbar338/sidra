import { request, use, expect } from "chai";
import chaiHttp from "chai-http";
import { APIRes, Bootstrap, Controller, Get, HTTPStatus } from "..";
import express from "express";
import { Server } from "http";

use(chaiHttp);
let listener: Server;

describe("Create Application", () => {
	it("Creating and bootstrapping application", (done) => {
		@Controller("/test")
		class TestController {
			@Get("/")
			getIndex(): APIRes<boolean> {
				return {
					statusCode: HTTPStatus.OK,
					message: "Test controller",
					data: true,
				};
			}
		}
		const app = express();
		listener = Bootstrap(app, [TestController], 3000);
		request(app)
			.get("/test/")
			.end((_, res) => {
				expect(res.body).to.haveOwnProperty("statusCode", 200);
				expect(res.body).to.haveOwnProperty(
					"message",
					"Test controller",
				);
				expect(res.body).to.haveOwnProperty("data", true);
				done();
			});
	});
	after((done) => {
		listener.close(done);
	});
});
