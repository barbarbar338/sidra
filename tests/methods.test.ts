import { request, use, expect } from "chai";
import chaiHttp from "chai-http";
import {
	APIRes,
	Bootstrap,
	Controller,
	Get,
	Post,
	Delete,
	Patch,
	All,
} from "..";
import express from "express";
import { Server } from "http";

use(chaiHttp);
let listener: Server;
let app: express.Express;

describe("Methods", () => {
	before(() => {
		@Controller("")
		class TestController {
			@Get("/get")
			get(): APIRes<null> {
				return {
					statusCode: 200,
					message: "Get",
					data: null,
				};
			}
			@Post("/post")
			post(): APIRes<null> {
				return {
					statusCode: 200,
					message: "Post",
					data: null,
				};
			}
			@Delete("/delete")
			delete(): APIRes<null> {
				return {
					statusCode: 200,
					message: "Delete",
					data: null,
				};
			}
			@Patch("/patch")
			patch(): APIRes<null> {
				return {
					statusCode: 200,
					message: "Patch",
					data: null,
				};
			}
			@All("/all")
			all(): APIRes<null> {
				return {
					statusCode: 200,
					message: "All",
					data: null,
				};
			}
		}
		app = express();
		listener = Bootstrap(app, [TestController], 3000);
	});

	it("GET", (done) => {
		request(app)
			.get("/get")
			.end((_, res) => {
				expect(res.body).to.haveOwnProperty("statusCode", 200);
				expect(res.body).to.haveOwnProperty("message", "Get");
				expect(res.body).to.haveOwnProperty("data", null);
				done();
			});
	});

	it("POST", (done) => {
		request(app)
			.post("/post")
			.end((_, res) => {
				expect(res.body).to.haveOwnProperty("statusCode", 200);
				expect(res.body).to.haveOwnProperty("message", "Post");
				expect(res.body).to.haveOwnProperty("data", null);
				done();
			});
	});

	it("DELETE", (done) => {
		request(app)
			.delete("/delete")
			.end((_, res) => {
				expect(res.body).to.haveOwnProperty("statusCode", 200);
				expect(res.body).to.haveOwnProperty("message", "Delete");
				expect(res.body).to.haveOwnProperty("data", null);
				done();
			});
	});

	it("PATCH", (done) => {
		request(app)
			.patch("/patch")
			.end((_, res) => {
				expect(res.body).to.haveOwnProperty("statusCode", 200);
				expect(res.body).to.haveOwnProperty("message", "Patch");
				expect(res.body).to.haveOwnProperty("data", null);
				done();
			});
	});

	it("ALL", (done) => {
		request(app)
			.options("/all")
			.end((_, res) => {
				expect(res.body).to.haveOwnProperty("statusCode", 200);
				expect(res.body).to.haveOwnProperty("message", "All");
				expect(res.body).to.haveOwnProperty("data", null);
				done();
			});
	});

	after((done) => {
		listener.close(done);
	});
});
