import { status, ThrowableRouter } from "itty-router-extras";
import { Exception } from "./Exception";
import { ForbiddenException } from "./exceptions";
import { APIRes, HTTPStatus, IRoute } from "./Utils";

export const Handle = (Controllers: any[]) => {
	const router = ThrowableRouter();

	for (const Controller of Controllers) {
		const controller = new Controller();

		const prefix = Reflect.getMetadata("prefix", Controller);
		const routes = Reflect.getMetadata("routes", Controller) as IRoute[];

		console.info(`Registering controller: ${prefix}`);

		for (const route of routes) {
			console.info(
				`Registering route: ${route.requestMethod} ${prefix}${route.path}`,
			);

			const prefixSplit = prefix
				.split("/")
				.map((p: string) => p.replace(/\/$/, "").trim())
				.filter(Boolean);
			const pathSplit = route.path
				.split("/")
				.map((p: string) => p.replace(/\/$/, "").trim())
				.filter(Boolean);
			const newPath = ["", ...prefixSplit, ...pathSplit].join("/");

			router[route.requestMethod](
				newPath,
				...route.middlewares,
				async (req) => {
					try {
						const res = await controller[route.methodName](req);
						const statusCode =
							res?.statusCode ||
							(route.redirect ? HTTPStatus.FOUND : HTTPStatus.OK);

						if (route.redirect) {
							if (!res || !res.to) {
								throw new ForbiddenException(
									"no redirect path defined",
								);
							}

							return Response.redirect(res.to, statusCode);
						} else {
							if (!res) {
								return status(statusCode, {
									data: null,
									message: "No Response",
									statusCode,
								} as APIRes<null>);
							} else {
								return status(statusCode, res);
							}
						}
					} catch (error) {
						console.error(error);

						if (error instanceof Exception) {
							const res = error.execute();
							const statusCode =
								res?.statusCode ||
								HTTPStatus.INTERNAL_SERVER_ERROR;

							return status(statusCode, res);
						} else {
							return status(HTTPStatus.INTERNAL_SERVER_ERROR, {
								data: null,
								message: "Internal Server Error",
								statusCode: HTTPStatus.INTERNAL_SERVER_ERROR,
								error: "If you are developer, see console.",
							} as APIRes<null>);
						}
					}
				},
			);

			console.info(
				`Registered route: ${route.requestMethod} ${prefix}${route.path}`,
			);
		}

		console.info(`Registered controller: ${prefix}`);
	}

	router.all("*", () => {
		return status(HTTPStatus.NOT_FOUND, {
			data: null,
			message: "Not Found",
			statusCode: HTTPStatus.NOT_FOUND,
			error: "Page not found",
		} as APIRes<null>);
	});

	console.info("Router initialized");

	return router.handle;
};
