import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class MethodNotAllowedException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.METHOD_NOT_ALLOWED, "Method Not Allowed", message);
	}
}
