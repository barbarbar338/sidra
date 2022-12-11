import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class NotImplementedException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.NOT_IMPLEMENTED, "Not Implemented", message);
	}
}
