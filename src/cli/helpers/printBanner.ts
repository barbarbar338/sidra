import fetch from "node-fetch";
import { buffer as terminalImageFromBuffer } from "terminal-image";

export default async function printBanner(): Promise<void> {
	const response = await fetch(
		"https://raw.githubusercontent.com/barbarbar338/sidra/main/assets/banner.png",
	);
	const buffer = await response.buffer();
	const consoleImage = await terminalImageFromBuffer(buffer);
	console.log(consoleImage);
}
