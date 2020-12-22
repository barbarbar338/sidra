import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.METHOD_NOT_ALLOWED, "Method Not Allowed", "message");
 */
export class MethodNotAllowedException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.METHOD_NOT_ALLOWED, "Method Not Allowed", message);
	}
}
