import { ParamDecorator } from "../ParamDecorator";

/**
 * Gives request ip.
 */
export function Ip() {
	return (target: any, propertyKey: string, parameterIndex: number) => {
		ParamDecorator("ip", target, propertyKey, parameterIndex);
	};
}
