import chalk from "chalk";
import * as pogger from "pogger";
import { SingleBar } from "cli-progress";
import clearConsole from "./helpers/clearConsole";
import printBanner from "./helpers/printBanner";
import installDependencies from "./helpers/installDependencies";
import initGit from "./helpers/initGit";
import clearCache from "./helpers/clearCache";
import cloneRepo from "./helpers/cloneRepo";
import checkFolder from "./helpers/checkFolder";

export default async function create(_command: string, args: any) {
	clearConsole();
	await printBanner();
	const template = args.template
		? (args.template as string)
		: "https://github.com/barbarbar338/sidra-template";
	const name = "sidra-project";
	pogger.info(`Creating a Sidra project into "${name}"...`);
	const bar = new SingleBar({
		format:
			"{date} {icon} {process} |" +
			chalk.cyan("{bar}") +
			"| {percentage}%",
		barCompleteChar: "\u2588",
		barIncompleteChar: "\u2591",
		hideCursor: true,
	});
	bar.start(100, 0, {
		date: pogger.generateDate(),
		icon: chalk.cyan(pogger.infoIcon),
		process: "Fetching Folders",
	});
	await checkFolder(name, bar);
	bar.update(30, {
		date: pogger.generateDate(),
		icon: chalk.cyan(pogger.infoIcon),
		process: "Cloning Template",
	});
	await cloneRepo(name, template, bar);
	bar.update(50, {
		date: pogger.generateDate(),
		icon: chalk.cyan(pogger.infoIcon),
		process: "Cleaning Cache",
	});
	await clearCache(name, bar);
	bar.update(70, {
		date: pogger.generateDate(),
		icon: chalk.cyan(pogger.infoIcon),
		process: "Initializing Git",
	});
	await initGit(name, bar);
	bar.update(90, {
		date: pogger.generateDate(),
		icon: chalk.cyan(pogger.infoIcon),
		process: "Installing Dependencies",
	});
	await installDependencies(name, bar);
	bar.increment(100, {
		date: pogger.generateDate(),
		icon: chalk.green(pogger.successIcon),
		process: "Done!",
	});
	bar.stop();
	pogger.success("Sidra project created successfully!");
	const cdCommand = chalk.cyan(`cd ${name}`);
	const startCommand = chalk.cyan("npm run dev");
	pogger.info(`Run ${cdCommand} and ${startCommand}`);
}
