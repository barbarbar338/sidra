import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class ForbiddenException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.FORBIDDEN, "Forbidden", message);
	}
}
