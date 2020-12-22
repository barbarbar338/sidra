import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.HTTP_VERSION_NOT_SUPPORTED, "HTTP Version Not Supported", "message");
 */
export class HttpVersionNotSupportedException extends Exception {
	constructor(message: string) {
		super(
			HTTPStatus.HTTP_VERSION_NOT_SUPPORTED,
			"HTTP Version Not Supported",
			message,
		);
	}
}
