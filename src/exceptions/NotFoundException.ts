import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class NotFoundException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.NOT_FOUND, "Not Found", message);
	}
}
