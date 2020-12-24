import { Method } from "../Method";

/**
 * use @All("path") decorator instead of app.all or @Method("all")("path")
 * @param path Request path
 */
export const All = Method("all");
