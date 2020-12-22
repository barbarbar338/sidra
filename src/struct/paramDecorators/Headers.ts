import { ParamDecorator } from "../ParamDecorator";

/**
 * Gives request headers. Provide a header name for a specific header.
 * @param header Header name. (leave empty for all headers)
 */
export function Headers(header?: string) {
	return (target: any, propertyKey: string, parameterIndex: number) => {
		ParamDecorator("headers", target, propertyKey, parameterIndex, {
			header,
		});
	};
}
