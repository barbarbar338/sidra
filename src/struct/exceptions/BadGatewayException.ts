import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.BAD_GATEWAY, "Bad Gateway", "message");
 */
export class BadGatewayException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.BAD_GATEWAY, "Bad Gateway", message);
	}
}
