import { Method } from "../Method";

/**
 * use @Patch("path") decorator instead of app.patch or @Method("patch")("path")
 * @param path Request path
 */
export const Patch = Method("patch");
