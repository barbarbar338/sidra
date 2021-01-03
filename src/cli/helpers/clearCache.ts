import { SingleBar } from "cli-progress";
import rimraf from "rimraf";
import * as pogger from "pogger";

export default function clearCache(
	name: string,
	bar: SingleBar,
): Promise<void> {
	return new Promise((resolve) => {
		rimraf(`./${name}/.git`, (error) => {
			if (error) {
				bar.stop();
				pogger.error(error.message);
				process.exit(1);
			}
			resolve();
		});
	});
}
