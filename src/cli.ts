#!/usr/bin/env node
import daph from "daph";
import { execSync } from "child_process";
import { mkdirSync, existsSync, readdirSync } from "fs";
import { resolve } from "path";
import { sync } from "rimraf";
import { Logger } from "./Logger";
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
		Logger.info(`Creating a Sidra project into "${name}"...`);
		if (!existsSync(`./${name}`)) mkdirSync(`./${name}`);
		else {
			const files = readdirSync(`./${name}`);
			if (files.length > 0)
				return Logger.error(
					`Empty the "${name}" folder and try again.`,
				);
		}
		Logger.info("Downloading template from repo...");
		execSync(
			`git clone https://github.com/barbarbar338/sidra-template ${name}`,
			{
				cwd: resolve(process.cwd()),
			},
		);
		sync(`./${name}/.git`);
		Logger.success("Template downloaded successfully!");
		Logger.info("Installing dependencies...");
		execSync("npm i", {
			cwd: resolve(process.cwd(), name),
		});
		Logger.success("Dependencies installed successfully!");
		const cdCommand = chalk.cyan(`cd ${name}`);
		const startCommand = chalk.cyan("npm run dev");
		Logger.success(
			`Sidra project created successfully! Run ${cdCommand} and ${startCommand}`,
		);
	},
).help();
