import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class GatewayTimeoutException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.GATEWAY_TIMEOUT, "Gateway Timeout", message);
	}
}
