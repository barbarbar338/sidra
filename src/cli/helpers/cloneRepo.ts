import { exec } from "child_process";
import { SingleBar } from "cli-progress";
import * as pogger from "pogger";
import { resolve as resolvePath } from "path";

export default function cloneRepo(
	name: string,
	template: string,
	bar: SingleBar,
): Promise<void> {
	return new Promise((resolve) => {
		exec(
			`git clone ${template} ${name}`,
			{
				cwd: resolvePath(process.cwd()),
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
