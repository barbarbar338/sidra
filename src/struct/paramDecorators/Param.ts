import { ParamDecorator } from "../ParamDecorator";

/**
 * Gives request parameters. Provide a param name for a specific parameter.
 * @param param Parameter name. (leave empty for all params)
 */
export function Param(param?: string) {
	return (target: any, propertyKey: string, parameterIndex: number) => {
		ParamDecorator("param", target, propertyKey, parameterIndex, { param });
	};
}
