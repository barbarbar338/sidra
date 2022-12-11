import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class RequestTimeoutException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.REQUEST_TIMEOUT, "Request Timeout", message);
	}
}
