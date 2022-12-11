import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class UnprocessableEntityException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.UNPROCESSABLE_ENTITY, "Unprocessable Entity", message);
	}
}
