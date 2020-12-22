import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.FORBIDDEN, "Forbidden", "message");
 */
export class ForbiddenException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.FORBIDDEN, "Forbidden", message);
	}
}
