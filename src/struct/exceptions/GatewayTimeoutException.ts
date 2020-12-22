import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.GATEWAY_TIMEOUT, "Gateway Timeout", "message");
 */
export class GatewayTimeoutException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.GATEWAY_TIMEOUT, "Gateway Timeout", message);
	}
}
