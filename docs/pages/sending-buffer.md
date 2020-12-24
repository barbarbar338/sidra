# Sending Buffers

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
const listener = Bootstrap(app, [HelloController], 3000);
```

Let's import our buffer 

```typescript
import { Controller, Get, APIRes, HTTPStatus, Bootstrap } from "sidra";
import express from "express";

import { readfileSync } from "fs";
const buffer = readfileSync("./path/to/file.png");

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
This is where things get messed up. If we send the buffer directly, it will think of it as an APIRes and try to do so. So we need to make our return type Buffer and our response type "image/png" (because we are using an image file here). For this we need to use the @Res decorator and we don't need APIRes anymore.

```typescript
import { Controller, Get, HTTPStatus, Bootstrap, Res } from "sidra";
import express, { Response } from "express";

import { readfileSync } from "fs";
const buffer = readfileSync("./path/to/file.png");

@Controller("/hello")
class HelloController {
	@Get("/world")
	getHelloWorld(
        @Res() res: Response
    ): Buffer {
        res.type("image/png");
        return buffer;
    }
}

const app = express();
const listener = Bootstrap(app, [HelloController], 3000);
```

## Result

Go to http://localhost:3000/hello/world and see whats going on!

You have to see an image
