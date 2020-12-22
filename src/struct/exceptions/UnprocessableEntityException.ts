import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.UNPROCESSABLE_ENTITY, "Unprocessable Entity", "message");
 */
export class UnprocessableEntityException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.UNPROCESSABLE_ENTITY, "Unprocessable Entity", message);
	}
}
