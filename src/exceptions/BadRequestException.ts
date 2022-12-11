import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class BadRequestException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.BAD_REQUEST, "Bad Request", message);
	}
}
