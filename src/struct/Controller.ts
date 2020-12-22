export const Controllers = [];

/**
 * Creates a controller.
 * @param prefix Controller prefix
 */
export function Controller(prefix: string) {
	return (target: unknown) => {
		Controllers.push(target);
		Reflect.defineMetadata("prefix", prefix, target);
		if (!Reflect.hasMetadata("routes", target))
			Reflect.defineMetadata("routes", [], target);
	};
}
