import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.UNAUTHORIZED, "Unauthorized", "message");
 */
export class UnauthorizedException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.UNAUTHORIZED, "Unauthorized", message);
	}
}
