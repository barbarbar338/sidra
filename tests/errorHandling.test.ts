import { request, use, expect } from "chai";
import chaiHttp from "chai-http";
import {
	APIRes,
	Bootstrap,
	Controller,
	Get,
	HTTPStatus,
	BadRequestException,
	Exception,
} from "..";
import express from "express";
import { Server } from "http";

use(chaiHttp);
let listener: Server;
let app: express.Express;

describe("Error Handling", () => {
	before(() => {
		@Controller("")
		class TestController {
			@Get("")
			getIndex(): APIRes<null> {
				throw new BadRequestException("Bad");
			}
			@Get("/custom")
			customException(): APIRes<null> {
				throw new Exception(
					HTTPStatus.IM_A_TEAPOT,
					"Custom Error",
					"Custom error message",
				);
			}
		}
		app = express();
		listener = Bootstrap(app, [TestController], 3000);
	});

	it("Using Built-In Exceptions", (done) => {
		request(app)
			.get("/")
			.end((_, res) => {
				expect(res.body).to.haveOwnProperty("statusCode", 400);
				expect(res.body).to.haveOwnProperty("message", "Bad");
				expect(res.body).to.haveOwnProperty("error", "Bad Request");
				done();
			});
	});

	it("404 Exception", (done) => {
		request(app)
			.get("/some/random/path")
			.end((_, res) => {
				expect(res.body).to.haveOwnProperty("statusCode", 404);
				expect(res.body).to.haveOwnProperty(
					"message",
					"Route not found",
				);
				expect(res.body).to.haveOwnProperty("error", "Not Found");
				done();
			});
	});

	it("Custom Exceptions", (done) => {
		request(app)
			.get("/custom")
			.end((_, res) => {
				expect(res.body).to.haveOwnProperty("statusCode", 418);
				expect(res.body).to.haveOwnProperty(
					"message",
					"Custom error message",
				);
				expect(res.body).to.haveOwnProperty("error", "Custom Error");
				done();
			});
	});

	after((done) => {
		listener.close(done);
	});
});
