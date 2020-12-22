import { APIRes, HTTPStatus } from "./Utils";

/**
 * Default exception class. Use this class for error handling.
 */
export class Exception {
	public code: HTTPStatus;
	public name: string;
	public message: string;

	constructor(code: HTTPStatus, name: string, message: string) {
		this.code = code;
		this.message = message;
		this.name = name;
	}

	execute(): APIRes<null> {
		return {
			statusCode: this.code,
			error: this.name,
			message: this.message,
			data: null,
		};
	}
}
