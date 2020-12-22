import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.PRECONDITION_FAILED, "Precondition Failed", "message");
 */
export class PreconditionFailedException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.PRECONDITION_FAILED, "Precondition Failed", message);
	}
}
