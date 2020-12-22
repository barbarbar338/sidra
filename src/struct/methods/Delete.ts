import { Method } from "../Method";

/**
 * use @Delete("path") decorator instead of app.delete or @Method("delete")("path")
 * @param path Request path
 */
export const Delete = Method("delete");
