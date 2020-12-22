import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.SERVICE_UNAVAILABLE, "Service Unavailable", "message");
 */
export class ServiceUnavailableException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.SERVICE_UNAVAILABLE, "Service Unavailable", message);
	}
}
