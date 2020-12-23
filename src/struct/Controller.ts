/**
 * Creates a controller.
 * @param prefix Controller prefix
 */
export function Controller(prefix: string) {
	return (target: unknown) => {
		Reflect.defineMetadata("prefix", prefix, target);
		if (!Reflect.hasMetadata("routes", target))
			Reflect.defineMetadata("routes", [], target);
	};
}
