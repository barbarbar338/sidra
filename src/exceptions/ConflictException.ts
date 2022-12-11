import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class ConflictException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.CONFLICT, "Conflict", message);
	}
}
