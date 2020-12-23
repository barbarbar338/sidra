import { Express, NextFunction, Request, Response } from "express";
import { urlencoded, json } from "body-parser";
import { HTTPStatus } from "./Utils";
import { Exception } from "./Exception";
import { Logger } from "../Logger";
import { AddressInfo } from "net";
import { Server } from "http";
import chalk from "chalk";

let GlobalPrefix = "";

/**
 * Updates global prefix.
 * @param prefix Global prefix
 */
export function SetGlobalPrefix(prefix: string) {
	GlobalPrefix = prefix;
}

export interface SidraOptions {
	debugLog: boolean;
}

/**
 * Bootstraps your application
 * @param app Express application
 * @param Controllers Sidra Controllers array
 * @param port Application port (default is 3000)
 */
export function Bootstrap(
	app: Express,
	Controllers: any[],
	port = 3000,
	options: SidraOptions = { debugLog: false },
): Server {
	Logger.info("Starting Sidra application...");
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
		Logger.info(`Mapping Controller: ${GlobalPrefix}${prefix}`);
		routes.forEach((route) => {
			Logger.info(`Mapping Route: ${GlobalPrefix}${prefix}${route.path}`);
			app[route.requestMethod](
				GlobalPrefix + prefix + route.path,
				...route.middlewares,
				async (req: Request, res: Response, next: NextFunction) => {
					const startDate = Date.now();
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
						if (options.debugLog) {
							const endDate = Date.now();
							Logger.info(
								`${chalk.yellowBright(
									(route.requestMethod as string).toUpperCase(),
								)} ${GlobalPrefix + prefix + route.path} ${
									endDate - startDate
								}ms ${chalk.greenBright(response.statusCode)}`,
							);
						}
						res.send(response);
					} catch (error) {
						const response = error;
						if (response instanceof Exception) {
							const exception = response.execute();
							res.statusCode = exception.statusCode;
							if (options.debugLog) {
								const endDate = Date.now();
								Logger.warning(
									`${chalk.yellowBright(
										(route.requestMethod as string).toUpperCase(),
									)} ${GlobalPrefix + prefix + route.path} ${
										endDate - startDate
									}ms ${chalk.yellowBright(
										exception.statusCode,
									)}`,
								);
							}
							res.send(exception);
						} else {
							Logger.error(error);
							res.statusCode = HTTPStatus.INTERNAL_SERVER_ERROR;
							if (options.debugLog) {
								const endDate = Date.now();
								Logger.error(
									`${chalk.yellowBright(
										(route.requestMethod as string).toUpperCase(),
									)} ${GlobalPrefix + prefix + route.path} ${
										endDate - startDate
									}ms ${chalk.redBright(
										HTTPStatus.INTERNAL_SERVER_ERROR,
									)}`,
								);
							}
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
			Logger.success(
				`Route mapped: ${GlobalPrefix}${prefix}${route.path}`,
			);
		});
		Logger.success(`Controller mapped: ${GlobalPrefix}${prefix}`);
	});
	Logger.success("Mapped all Controllers");
	app.all("*", (req, res) => {
		if (options.debugLog) {
			Logger.error(
				`${chalk.yellowBright(req.method.toUpperCase())} ${
					req.path
				} 0ms ${chalk.redBright(HTTPStatus.NOT_FOUND)}`,
			);
		}
		res.statusCode = HTTPStatus.NOT_FOUND;
		res.json({
			statusCode: HTTPStatus.NOT_FOUND,
			error: "Not Found",
			message: "Route not found",
			data: null,
		});
	});
	Logger.info("Starting Application");
	const listener = app.listen(port, "0.0.0.0", () => {
		Logger.success(
			`Application started successfully on port ${
				(listener.address() as AddressInfo).port
			}`,
		);
	});
	return listener;
}
