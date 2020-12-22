import { NextFunction, Request, Response } from "express";

export type TMiddleware = (
	request: Request,
	response: Response,
	next: NextFunction,
) => void;

/**
 * Middleware decorator. Adds a middleware to be used in your method.
 * @param middleware Middleware
 */
export function Middleware(middleware: TMiddleware) {
	return (target: unknown, propertyKey: string) => {
		if (!Reflect.hasMetadata("routes", target.constructor))
			Reflect.defineMetadata("routes", [], target.constructor);
		let routes = Reflect.getMetadata("routes", target.constructor);
		const route = routes.find((route) => route.methodName === propertyKey);
		if (!route)
			throw Error(
				"Define the Middleware decorator first. Then define the Method decorator.",
			);
		route.middlewares.push(middleware);
		routes = routes.filter((route) => route.methodName !== propertyKey);
		Reflect.defineMetadata(
			"routes",
			[...routes, route],
			target.constructor,
		);
	};
}
