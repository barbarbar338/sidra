import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.PAYLOAD_TOO_LARGE, "Payload Too Large", "message");
 */
export class PayloadTooLargeException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.PAYLOAD_TOO_LARGE, "Payload Too Large", message);
	}
}
