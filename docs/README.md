![Banner](https://raw.githubusercontent.com/barisbored/sidra/main/assets/banner.png)
[![build](https://img.shields.io/github/workflow/status/barisbored/sidra/Build%20and%20Test?logo=github&style=for-the-badge)](https://github.com/barisbored/sidra)
[![supportServer](https://img.shields.io/discord/711995199945179187?color=7289DA&label=Support&logo=discord&style=for-the-badge)](https://discord.gg/BjEJFwh)
[![totalDownloads](https://img.shields.io/npm/dt/sidra?color=CC3534&logo=npm&style=for-the-badge)](http://npmjs.com/sidra)
[![weeklyDownloads](https://img.shields.io/npm/dw/sidra?color=CC3534&logo=npm&style=for-the-badge)](http://npmjs.com/sidra)
[![version](https://img.shields.io/npm/v/sidra?color=red&label=Version&logo=npm&style=for-the-badge)](http://npmjs.com/sidra)
[![stars](https://img.shields.io/github/stars/barisbored/sidra?color=yellow&logo=github&style=for-the-badge)](https://github.com/barisbored/sidra)
[![license](https://img.shields.io/github/license/barisbored/sidra?logo=github&style=for-the-badge)](https://github.com/barisbored/sidra)

## ⚔️ SidraJS

Sidra offers you many [decorators](https://stackoverflow.com/tags/javascript-decorators/info) for you to use with the [Cloudflare Workers](https://workers.cloudflare.com/).

TypeScript definitions are built in.

## Installation

-   Run
    ```
    $ npm install sidra
    ```
    or
    ```
    $ yarn add sidra
    ```

## Docs

https://barisbored.github.io/sidra/

## Examples

See https://github.com/barisbored/sidra-template

```typescript
import { type APIRes, Controller, Get, Handle, HTTPStatus } from "sidra";

@Controller()
class MyController {
	@Get()
	get(): APIRes<string> {
		return {
			data: "Hello, Sidra!",
			message: "Hello, world!",
			statusCode: HTTPStatus.OK,
		};
	}
}

const handler = Handle([MyController]);

addEventListener("fetch", (event) => {
	event.respondWith(handler(event.request));
});
```
