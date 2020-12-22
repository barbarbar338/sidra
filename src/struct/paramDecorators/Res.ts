import { ParamDecorator } from "../ParamDecorator";

/**
 * Gives response object.
 */
export function Res() {
	return (target: any, propertyKey: string, parameterIndex: number) => {
		ParamDecorator("response", target, propertyKey, parameterIndex);
	};
}
