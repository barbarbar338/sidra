#!/usr/bin/env node
import daph from "daph";
import create from "./cli/create";

daph.createCommand(
	{
		name: "create",
		usage: "[--template <templateURL>]",
		example: [
			"",
			"--template https://github.com/barbarbar338/sidra-template",
			"-t https://github.com/barbarbar338/sidra-template"
		],
		category: "utility",
		aliases: ["c", "g", "generate", "init", "i", "initialize"],
		description: "Creates a new SidraJS project",
		argDefinitions: [
			{
				name: "template",
				type: String,
				aliases: ["t", "temp"],
				default: true,
				isOptional: true,
			},
		],
	},
	create,
).help();
