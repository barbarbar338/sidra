import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class PayloadTooLargeException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.PAYLOAD_TOO_LARGE, "Payload Too Large", message);
	}
}
