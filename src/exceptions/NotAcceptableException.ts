import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class NotAcceptableException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.NOT_ACCEPTABLE, "Not Acceptable", message);
	}
}
