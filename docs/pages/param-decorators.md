# Param Decorators

These decorators allow you to use request and response variables in your functions.

Let's go through a simple template. For more information about this template, check out the [Manual Instructions](pages/manual-instructions.md) page.

```typescript
import { Controller, Get, APIRes, HTTPStatus, Bootstrap } from "sidra";
import express from "express";

@Controller("/hello")
class HelloController {
	@Get("/world")
	getHelloWorld(): APIRes<null> {
		return {
			statusCode: HTTPStatus.OK,
			message: "Hello, world!",
			data: null,
		};
	}
}

const app = express();
const listener = Bootstrap(app, 3000);
```

Let's make a few changes here

```typescript
import { Controller, Get, APIRes, HTTPStatus, Bootstrap } from "sidra";
import express from "express";

@Controller("/hello")
class HelloController {
	@Get("/:name")
	getHelloWorld(): APIRes<null> {
		return {
			statusCode: HTTPStatus.OK,
			message: "Hello, world!",
			data: null,
		};
	}
}

const app = express();
const listener = Bootstrap(app, 3000);
```

As you can see we changed the route "/world" to "/:name". Now let's decorate a parameter with the @Param decorator to access this "name" parameter. See [All Param Decorators](pages/all-param-decorators.md) page for all param decorators.

```typescript
import { Controller, Get, APIRes, HTTPStatus, Bootstrap, Param } from "sidra";
import express from "express";

@Controller("/hello")
class HelloController {
	@Get("/:name")
	getHelloWorld(@Param("name") name: string): APIRes<null> {
		return {
			statusCode: HTTPStatus.OK,
			message: `Hello, ${name}!`,
			data: null,
		};
	}
}

const app = express();
const listener = Bootstrap(app, 3000);
```

# Result

Go to http://localhost:3000/hello/Sidra and see whats going on!

You have to see something like:

```javascript
{
    "statusCode": 200,
    "message": "Hello, Sidra!",
    "data": null
}
```
