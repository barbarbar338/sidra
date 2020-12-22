import { Method } from "../Method";

/**
 * use @Put("path") decorator instead of app.put or @Method("put")("path")
 * @param path Request path
 */
export const Put = Method("put");
