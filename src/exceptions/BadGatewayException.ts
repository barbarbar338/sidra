import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class BadGatewayException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.BAD_GATEWAY, "Bad Gateway", message);
	}
}
