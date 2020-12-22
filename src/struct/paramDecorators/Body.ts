import { ParamDecorator } from "../ParamDecorator";

/**
 * Gives request body.
 */
export function Body() {
	return (target: any, propertyKey: string, parameterIndex: number) => {
		ParamDecorator("body", target, propertyKey, parameterIndex);
	};
}
