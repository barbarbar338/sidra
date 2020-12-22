import { ParamDecorator } from "../ParamDecorator";

/**
 * Gives request queries. Provide a query name for a specific query.
 * @param query Query name. (leave empty for all queries)
 */
export function Query(query?: string) {
	return (target: any, propertyKey: string, parameterIndex: number) => {
		ParamDecorator("query", target, propertyKey, parameterIndex, { query });
	};
}
