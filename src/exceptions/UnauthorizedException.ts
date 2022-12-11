import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class UnauthorizedException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.UNAUTHORIZED, "Unauthorized", message);
	}
}
