import { Exception } from "../Exception";
import { HTTPStatus } from "../Utils";

export class ImATeapotException extends Exception {
	constructor(message: string) {
		super(HTTPStatus.IM_A_TEAPOT, "I'm A Teapot", message);
	}
}
