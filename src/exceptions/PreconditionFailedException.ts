import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class PreconditionFailedException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.PRECONDITION_FAILED, "Precondition Failed", message);
	}
}
