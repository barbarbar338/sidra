import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

/**
 * use this class for error handling instead of new Error("message") or new Exception(HTTPStatus.IM_A_TEAPOT, "I'm A Teapot", "message");
 */
export class ImATeapotException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.IM_A_TEAPOT, "I'm A Teapot", message);
	}
}
