import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class HttpVersionNotSupportedException extends Exception {
	constructor(message: string) {
		super(
			HTTPStatus.HTTP_VERSION_NOT_SUPPORTED,
			"HTTP Version Not Supported",
			message,
		);
	}
}
