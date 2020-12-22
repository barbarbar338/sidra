export interface LooseObject {
	[key: string]: unknown;
}

/**
 * Creates a param decorator. Don't use this.
 * @param type Parameter type
 * @param target decorator target
 * @param propertyKey function key
 * @param parameterIndex parameter index
 * @param data parameter data
 */
export function ParamDecorator(
	type: string,
	target: any,
	propertyKey: string,
	parameterIndex: number,
	data?: LooseObject,
) {
	const meta: any[] =
		Reflect.getMetadata(
			"routeArguments",
			target.constructor,
			propertyKey,
		) || [];
	const existing = meta.find((d) => d.index == parameterIndex);
	if (existing) meta[parameterIndex + 1] = { ...existing, ...data };
	else meta.unshift({ index: parameterIndex, propertyKey, type, ...data });
	Reflect.defineMetadata(
		"routeArguments",
		meta,
		target.constructor,
		propertyKey,
	);
}
