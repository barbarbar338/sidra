import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.GONE, "Gone", "message");
 */
export class GoneException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.GONE, "Gone", message);
	}
}
