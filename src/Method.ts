import { IRoute } from "./Utils";

export const Method = (method: string) => {
	return (path = "") => {
		const decorator: MethodDecorator = (target, propertyKey) => {
			if (!Reflect.hasMetadata("routes", target.constructor)) {
				Reflect.defineMetadata("routes", [], target.constructor);
			}

			const routes = Reflect.getMetadata(
				"routes",
				target.constructor,
			) as IRoute[];

			routes.push({
				requestMethod: method,
				path,
				middlewares: [],
				methodName: propertyKey,
			});

			Reflect.defineMetadata("routes", routes, target.constructor);
		};

		return decorator;
	};
};

export const Get = Method("get");
export const Post = Method("post");
export const Put = Method("put");
export const Patch = Method("patch");
export const Delete = Method("delete");
export const Head = Method("head");
export const All = Method("all");
