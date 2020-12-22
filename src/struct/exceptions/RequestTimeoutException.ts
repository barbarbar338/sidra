import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.REQUEST_TIMEOUT, "Request Timeout", "message");
 */
export class RequestTimeoutException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.REQUEST_TIMEOUT, "Request Timeout", message);
	}
}
