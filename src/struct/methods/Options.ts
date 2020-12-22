import { Method } from "../Method";

/**
 * use @Options("path") decorator instead of app.options or @Method("options")("path")
 * @param path Request path
 */
export const Options = Method("options");
