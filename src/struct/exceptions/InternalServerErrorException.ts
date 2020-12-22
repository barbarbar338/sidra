import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", "message");
 */
export class InternalServerErrorException extends Exception {
	constructor(message: string) {
		super(
			HTTPStatus.INTERNAL_SERVER_ERROR,
			"Internal Server Error",
			message,
		);
	}
}
