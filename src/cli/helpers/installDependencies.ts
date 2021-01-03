import { resolve as resolvePath } from "path";
import { exec } from "child_process";
import { SingleBar } from "cli-progress";
import * as pogger from "pogger";

export default function installDependencies(
	name: string,
	bar: SingleBar,
): Promise<void> {
	return new Promise((resolve) => {
		exec(
			"npm i",
			{
				cwd: resolvePath(process.cwd(), name),
			},
			(error) => {
				if (error) {
					bar.stop();
					pogger.error(error.message);
					process.exit(1);
				}
				resolve();
			},
		);
	});
}
