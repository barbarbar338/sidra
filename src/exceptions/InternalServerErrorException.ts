import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class InternalServerErrorException extends Exception {
	constructor(message: string) {
		super(
			HTTPStatus.INTERNAL_SERVER_ERROR,
			"Internal Server Error",
			message,
		);
	}
}
