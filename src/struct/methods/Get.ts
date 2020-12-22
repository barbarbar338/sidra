import { Method } from "../Method";

/**
 * use @Get("path") decorator instead of app.get or @Method("get")("path")
 * @param path Request path
 */
export const Get = Method("get");
