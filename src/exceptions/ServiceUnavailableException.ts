import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class ServiceUnavailableException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.SERVICE_UNAVAILABLE, "Service Unavailable", message);
	}
}
