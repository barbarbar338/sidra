import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class GoneException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.GONE, "Gone", message);
	}
}
