# Error Handling

What you need to do in an incorrect or incomplete transaction.

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
	@Get("/")
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

As you can see we changed the route "/world" to "/". Now let's decorate a parameter with the @Query decorator to access this "name" query. See [All Param Decorators](pages/all-param-decorators.md) page for all param decorators.

```typescript
import { Controller, Get, APIRes, HTTPStatus, Bootstrap, Query } from "sidra";
import express from "express";

@Controller("/hello")
class HelloController {
	@Get("/")
	getHelloWorld(@Query("name") name: string): APIRes<null> {
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

However, there is a problem now, the user may not specify the "name" query. Let's try to avoid this error now. To avoid this, we will use the "Exception" class. See [Exceptions](pages/exceptions.md) page for all exceptions.

```typescript
import {
	Controller,
	Get,
	APIRes,
	HTTPStatus,
	Bootstrap,
	Query,
	BadRequestException,
} from "sidra";
import express from "express";

@Controller("/hello")
class HelloController {
	@Get("/")
	getHelloWorld(@Query("name") name: string): APIRes<null> {
		if (!name) throw new BadRequestException("name query is required");
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

## Result

Go to http://localhost:3000/hello/ and see whats going on!

You have to see something like:

```javascript
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "name query is required",
    "data": null
}
```

Now go to http://localhost:3000/hello/?name=Sidra and see whats going on!

You have to see something like:

```javascript
{
    "statusCode": 200,
    "message": "Hello, Sidra!",
    "data": null
}
```
