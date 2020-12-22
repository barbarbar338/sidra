import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.UNSUPPORTED_MEDIA_TYPE, "Unsupported Media Type", "message");
 */
export class UnsupportedMediaTypeException extends Exception {
	constructor(message: string) {
		super(
			HTTPStatus.UNSUPPORTED_MEDIA_TYPE,
			"Unsupported Media Type",
			message,
		);
	}
}
