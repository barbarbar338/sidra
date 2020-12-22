import { Method } from "../Method";

/**
 * use @Post("path") decorator instead of app.post or @Method("post")("path")
 * @param path Request path
 */
export const Post = Method("post");
