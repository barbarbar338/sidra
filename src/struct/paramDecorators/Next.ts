import { ParamDecorator } from "../ParamDecorator";

/**
 * Gives next function.
 */
export function Next() {
	return (target: any, propertyKey: string, parameterIndex: number) => {
		ParamDecorator("nextfunction", target, propertyKey, parameterIndex);
	};
}
