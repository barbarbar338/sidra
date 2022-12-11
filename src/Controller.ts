export function Controller(prefix = "") {
	const decorator: ClassDecorator = (target) => {
		Reflect.defineMetadata("prefix", prefix || "", target);

		if (!Reflect.hasMetadata("routes", target)) {
			Reflect.defineMetadata("routes", [], target);
		}
	};

	return decorator;
}
