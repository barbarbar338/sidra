import { Controllers } from "./Controller";
import { Express, NextFunction, Request, Response } from "express";
import { urlencoded, json } from "body-parser";
import { HTTPStatus } from "./Utils";
import { Exception } from "./Exception";

let GlobalPrefix = "";

/**
 * Updates global prefix.
 * @param prefix Global prefix
 */
export function SetGlobalPrefix(prefix: string) {
	GlobalPrefix = prefix;
}

/**
 * Bootstraps your application
 * @param app Express application
 * @param port Application port (default is 3000)
 */
export function Bootstrap(app: Express, port = 3000) {
	app.use(
		urlencoded({
			extended: false,
		}),
	);
	app.use(json());
	Controllers.forEach((Controller) => {
		const controller = new Controller();
		const prefix = Reflect.getMetadata("prefix", Controller);
		const routes = Reflect.getMetadata("routes", Controller);
		routes.forEach((route) => {
			app[route.requestMethod](
				GlobalPrefix + prefix + route.path,
				...route.middlewares,
				async (req: Request, res: Response, next: NextFunction) => {
					const args = (
						(Reflect.getMetadata(
							"routeArguments",
							Controller,
							route.methodName,
						) as any[]) || []
					).map((arg) => {
						switch (arg.type) {
							case "param":
								return arg.param
									? req.params[arg.param]
									: req.params;
							case "query":
								return arg.query
									? req.query[arg.query]
									: req.query;
							case "headers":
								return arg.headers
									? req.headers[arg.headers]
									: req.headers;
							case "request":
								return req;
							case "response":
								return res;
							case "body":
								return req.body;
							case "nextfunction":
								return next;
							case "ip":
								return req.ip;
						}
					});
					try {
						const response = await controller[route.methodName](
							...args,
						);
						res.statusCode = response.statusCode || 200;
						res.send(response);
					} catch (error) {
						const response = error;
						if (response instanceof Exception) {
							const exception = response.execute();
							res.statusCode = exception.statusCode;
							res.send(exception);
						} else {
							console.error(error);
							res.statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
							res.json({
								statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
								error: "Internal Server Error",
								message: "If you are developer, see console.",
								data: null,
							});
						}
					}
				},
			);
		});
	});
	app.listen(port, "0.0.0.0", () => {
		console.log("ready");
	});
}
