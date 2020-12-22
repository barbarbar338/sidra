import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.BAD_REQUEST, "Bad Request", "message");
 */
export class BadRequestException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.BAD_REQUEST, "Bad Request", message);
	}
}
