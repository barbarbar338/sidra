import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class UnsupportedMediaTypeException extends Exception {
	constructor(message: string) {
		super(
			HTTPStatus.UNSUPPORTED_MEDIA_TYPE,
			"Unsupported Media Type",
			message,
		);
	}
}
