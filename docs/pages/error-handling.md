# Error Handling

What you need to do in an incorrect or incomplete transaction. Note: Sidra automatically handles 404 pages.

Let's go through a simple template. For more information about this template, check out the [Getting Started](pages/getting-started.md?id=getting-started) page.

```typescript
import { Controller, Get, APIRes, HTTPStatus, Handle } from "sidra";

@Controller("/hello")
class HelloController {
	@Get("/world")
	getHelloWorld(): APIRes<null> {
		return {
			statusCode: HTTPStatus.OK,
			message: "Hello, Sidra!",
			data: null,
		};
	}
}

const handler = Handle([HelloController]);

addEventListener("fetch", (event) => {
	event.respondWith(handler(event.request));
});
```

Let's make a few changes here

```typescript
import { Controller, Get, APIRes, HTTPStatus, Handle } from "sidra";

@Controller("/hello")
class HelloController {
	@Get("/:id")
	getHelloWorld(req: Request): APIRes<string> {
		const id = req.params?.id;
		return {
			statusCode: HTTPStatus.OK,
			message: "Hello, Sidra!",
			data: id,
		};
	}
}

const handler = Handle([HelloController]);

addEventListener("fetch", (event) => {
	event.respondWith(handler(event.request));
});
```

As you can see we changed the route "/world" to "/:id" and tried to access `id` parameter.

```typescript
import {
	Controller,
	Get,
	APIRes,
	HTTPStatus,
	Handle,
	UnauthorizedException,
} from "sidra";

@Controller("/hello")
class HelloController {
	@Get("/:id")
	getHelloWorld(req: Request): APIRes<string> {
		const id = req.params?.id;

		if (id !== "OWNER_ID")
			throw new UnauthorizedException(
				"You are not the owner of this route",
			);

		return {
			statusCode: HTTPStatus.OK,
			message: "Hello, Sidra!",
			data: id,
		};
	}
}

const handler = Handle([HelloController]);

addEventListener("fetch", (event) => {
	event.respondWith(handler(event.request));
});
```

As you can see, we added a condition to check if the id is equal to "OWNER_ID". If not, we throw an exception. These exceptions are handled by Sidra. See [Exceptions](pages/exceptions.md?id=exceptions) page for all exceptions.

## Result

Go to http://localhost:8787/hello/test and see whats going on!

You have to see something like:

```javascript
{
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "You are not the owner of this route",
    "data": null
}
```

Now go to http://localhost:8787/hello/OWNER_ID and see whats going on!

You have to see something like:

```javascript
{
    "statusCode": 200,
    "message": "Hello, Sidra!",
    "data": null
}
```
