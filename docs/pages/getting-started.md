# Getting Started

You can use command `npx wrangler generate my-app https://github.com/barbarbar338/sidra-template` to create a new Sidra project or you can manually install Sidra to your project. In the examples here, we will use a TypeScript environment.

## Prerequisites

-   [NodeJS](https://nodejs.org/)
-   [Wrangler](https://developers.cloudflare.com/workers/#installing-the-workers-cli)
-   [TypeScript](https://www.typescriptlang.org/) worker environment
-   Code editor

## tsconfig.json Configuration

Don't forget to add `emitDecoratorMetadata` and `experimentalDecorators` properties to your tsconfig.json file:

```javascript
// tsconfig.json
{
    "compilerOptions": {
        ...
        "emitDecoratorMetadata": true,
		"experimentalDecorators": true,
        ...
    }
}
```

## Creating A Controller

We will decorate our controller with the `Controller` decorator.

```typescript
import { Controller } from "sidra";

@Controller("/hello")
class HelloController {}
```

## Creating A Route

We create a route function inside our old controller and decorate it with the `Method` decorator. See [Method Decorators](pages/method-decorators.md) page for all `Method` decorators. (`Get` decorator is a `Method` decorator. `Get("/path")` = `Method("get")("/path)`)

```typescript
import { Controller, Get, APIRes, HTTPStatus } from "sidra";

@Controller("/hello")
class HelloController {
	@Get("/world") // => this is basicly a handler for GET request to /hello/world
	getHelloWorld(): APIRes<null> {
		return {
			statusCode: HTTPStatus.OK,
			message: "Hello, Sidra!",
			data: null,
		};
	}
}
```

## Start Your Application

First, we will create our handler with `Handle` function and then we can listen fetch events with `addEventListener` function.

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

const handler = Handle([HelloController]); // create handler

addEventListener("fetch", (event) => {
	event.respondWith(handler(event.request)); // use handler
});
```

## Result

Go to http://localhost:8787/hello/world and see whats going on!

You have to see something like:

```javascript
{
    "statusCode": 200,
    "message": "Hello, Sidra!",
    "data": null
}
```
