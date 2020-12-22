import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.NOT_IMPLEMENTED, "Not Implemented", "message");
 */
export class NotImplementedException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.NOT_IMPLEMENTED, "Not Implemented", message);
	}
}
