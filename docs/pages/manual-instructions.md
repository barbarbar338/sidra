# Manual Instructions

Manually install your Sidra project. In the examples here, we will use a TypeScript environment.

## Prerequisites

-   [NodeJS](https://nodejs.org/)
-   [TypeScript](https://www.typescriptlang.org/) or [Babel](https://babeljs.io/) environment
-   Code editor

## js/tsconfig.json Configuration

Don't forget to add "emitDecoratorMetadata" and "experimentalDecorators" properties to your js/tsconfig.json file:

```javascript
// js/tsconfig.json
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

We will decorate our controller with the "Controller" decorator.

```typescript
import { Controller } from "sidra";

@Controller("/hello")
class HelloController {}
```

## Creating A Route

We create a Route function inside our old controller and decorate it with the "Method" decorator. See [Method Decorators](pages/method-decorators.md) page for all Method decorators.

```typescript
import { Controller, Get, APIRes, HTTPStatus } from "sidra";

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
```

## Bootstrap Your Application

First, we will create an Express application and run it with the "Bootstrap" function.

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
const listener = Bootstrap(app, [HelloController], 3000);
```

We wanted our app to launch at port 3000

## Result

Go to http://localhost:3000/hello/world and see whats going on!

You have to see something like:

```javascript
{
    "statusCode": 200,
    "message": "Hello, world!",
    "data": null
}
```
