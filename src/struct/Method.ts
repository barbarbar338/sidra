/**
 * Creates a method decorator. You can use @Get, @Post etc. decorators instead of this.
 * @param method Request method
 */
export function Method(method: string) {
	return (path: string) => {
		return (target: unknown, propertyKey: string) => {
			if (!Reflect.hasMetadata("routes", target.constructor))
				Reflect.defineMetadata("routes", [], target.constructor);
			const routes = Reflect.getMetadata("routes", target.constructor);
			routes.push({
				requestMethod: method,
				middlewares: [],
				path,
				methodName: propertyKey,
			});
			Reflect.defineMetadata("routes", routes, target.constructor);
		};
	};
}
