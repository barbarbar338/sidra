#!/usr/bin/env node
import daph from "daph";
import { execSync } from "child_process";
import { mkdirSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";
import { sync } from "rimraf";
import { logger } from "./logger";
import chalk from "chalk";

daph.createCommand(
	{
		name: "create",
		usage: "",
		example: [],
		category: "utility",
		aliases: ["c", "g", "generate", "init", "i", "initialize"],
		description: "Creates a new SidraJS project",
		argDefinitions: [],
	},
	(): unknown => {
		const name = "sidra-project";
		logger.info(`Creating a Sidra project into "${name}"...`);
		if (!existsSync(`./${name}`)) mkdirSync(`./${name}`);
		else {
			const files = readdirSync(`./${name}`);
			if (files.length > 0)
				return logger.error(
					`Empty the "${name}" folder and try again.`,
				);
		}
		logger.info("Downloading template from repo...");
		execSync(
			`git clone https://github.com/barbarbar338/sidra-template ${name}`,
			{
				cwd: resolve(process.cwd()),
			},
		);
		sync(`./${name}/.git`);
		logger.success("Template downloaded successfully!");
		logger.info("Installing dependencies...");
		execSync("npm i", {
			cwd: resolve(process.cwd(), name),
		});
		logger.success("Dependencies installed successfully!");
		const cdCommand = chalk.blue(`cd ${name}`);
		const startCommand = chalk.blue("npm run dev");
		logger.success(
			`Sidra project created successfully! Run ${cdCommand} and ${startCommand}`,
		);
	},
).help();
