import { SingleBar } from "cli-progress";
import { stat, readdir } from "fs";
import * as pogger from "pogger";

export default function checkFolder(
	name: string,
	bar: SingleBar,
): Promise<void> {
	return new Promise((resolve) => {
		stat(`./${name}`, (error, stats) => {
			if (error && error.code !== "ENOENT") {
				bar.stop();
				pogger.error(error.message);
				process.exit(1);
			} else if (stats && stats.isDirectory()) {
				readdir(`./${name}`, (err, files) => {
					if (error) {
						bar.stop();
						pogger.error(error.message);
						process.exit(1);
					}
					if (files.length > 0) {
						bar.stop();
						pogger.error(
							`Empty the "${name}" folder and try again.`,
						);
						process.exit(1);
					}
					resolve();
				});
			} else resolve();
		});
	});
}
