import { IRoute } from "./Utils";

export const Redirect = () => {
	const decorator: MethodDecorator = (target, propertyKey) => {
		if (!Reflect.hasMetadata("routes", target.constructor)) {
			Reflect.defineMetadata("routes", [], target.constructor);
		}

		const routes = Reflect.getMetadata(
			"routes",
			target.constructor,
		) as IRoute[];

		const route = routes.find((route) => {
			return route.methodName === propertyKey;
		});
		if (!route) {
			throw Error(
				`Define the Redirect decorator first. Then define the Method decorator. (${String(
					propertyKey,
				)})`,
			);
		}

		route.redirect = true;
		const index = routes.findIndex((route) => {
			return route.methodName === propertyKey;
		});
		routes[index] = route;

		Reflect.defineMetadata(
			"routes",
			[...routes, route],
			target.constructor,
		);
	};

	return decorator;
};
