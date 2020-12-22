import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.CONFLICT, "Conflict", "message");
 */
export class ConflictException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.CONFLICT, "Conflict", message);
	}
}
