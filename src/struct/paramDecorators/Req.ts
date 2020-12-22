import { ParamDecorator } from "../ParamDecorator";

/**
 * Gives request object.
 */
export function Req() {
	return (target: any, propertyKey: string, parameterIndex: number) => {
		ParamDecorator("request", target, propertyKey, parameterIndex);
	};
}
